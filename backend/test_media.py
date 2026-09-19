import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

from fastapi.testclient import TestClient
from backend import main


class MediaTests(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.patch = patch.object(main, "MEDIA_DIRECTORY", Path(self.directory.name))
        self.patch.start()
        media_route = next(route for route in main.app.routes if route.path == '/media')
        self.serving_patch = patch.object(media_route.app, "all_directories", [self.directory.name])
        self.serving_patch.start()
        self.client = TestClient(main.app)

    def tearDown(self):
        self.serving_patch.stop()
        self.patch.stop()
        self.directory.cleanup()

    def test_without_credentials_and_ai_route_preserved(self):
        with patch.dict("os.environ", {"OPENAI_API_KEY": ""}):
            self.assertEqual(self.client.get("/api/health").json(), {"status": "ok"})
            response = self.client.post("/api/media/upload", files={"file": ("../../sample.mp4", b"local-video", "video/mp4")})
            self.assertEqual(response.status_code, 200)
            filename = response.json()["filename"]
            self.assertEqual(Path(filename).name, filename)
            self.assertEqual((Path(self.directory.name) / filename).read_bytes(), b"local-video")
            self.assertTrue(response.json()["url"].endswith("/media/" + filename))
            ai = self.client.post("/api/ai/generate-cta", json={"brandName": "Demo", "goal": "Visit", "audience": "Everyone", "tone": "Clear", "language": "en"})
            self.assertEqual(ai.status_code, 503)

    def test_validation_collision_and_cleanup(self):
        for name, content, status in [("a.exe", b"bad", 415), ("a.mp4", b"", 400)]:
            self.assertEqual(self.client.post("/api/media/upload", files={"file": (name, content)}).status_code, status)
        with patch.object(main, "MAX_UPLOAD_BYTES", 4):
            self.assertEqual(self.client.post("/api/media/upload", files={"file": ("a.webm", b"12345")}).status_code, 413)
        self.assertEqual(list(Path(self.directory.name).iterdir()), [])
        first = self.client.post("/api/media/upload", files={"file": ("a.WEBM", b"1")}).json()
        second = self.client.post("/api/media/upload", files={"file": ("a.WEBM", b"2")}).json()
        self.assertNotEqual(first["filename"], second["filename"])

    def test_upload_size_and_http_ranges(self):
        for payload in [b"first-video" * 100, b"second-video" * 200]:
            result = self.client.post("/api/media/upload", files={"file": ("sample.mp4", payload, "video/mp4")}).json()
            self.assertEqual(result["size"], len(payload))
            url = result["url"]
            full = self.client.get(url)
            self.assertEqual(full.status_code, 200)
            self.assertEqual(full.headers["content-type"], "video/mp4")
            self.assertEqual(int(full.headers["content-length"]), len(payload))
            self.assertEqual(full.content, payload)
            head = self.client.head(url)
            self.assertEqual(head.status_code, 200)
            self.assertEqual(int(head.headers["content-length"]), len(payload))
            for value, expected in [("bytes=0-15", payload[:16]), ("bytes=-16", payload[-16:])]:
                partial = self.client.get(url, headers={"Range": value})
                self.assertEqual(partial.status_code, 206)
                self.assertEqual(partial.content, expected)
                self.assertEqual(partial.headers["content-length"], "16")
            self.assertEqual(self.client.get(url, headers={"Range": f"bytes={len(payload)}-"}).status_code, 416)

    def test_cors(self):
        for method in ["POST", "GET"]:
            response = self.client.options("/api/media/upload", headers={"Origin": "http://localhost:5180", "Access-Control-Request-Method": method})
            self.assertEqual(response.headers["access-control-allow-origin"], "http://localhost:5180")
        response = self.client.get("/api/health", headers={"Origin": "https://example.com"})
        self.assertNotIn("access-control-allow-origin", response.headers)


if __name__ == "__main__":
    unittest.main()

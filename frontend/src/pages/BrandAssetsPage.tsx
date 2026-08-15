import EmptyState from '../components/EmptyState'
import PageHeader from '../components/PageHeader'

const assetTypes = ['Logo', 'Brand name', 'Brand colors', 'Fonts', 'Background images', 'Product / property images', 'Contact information', 'QR destinations']

const BrandAssetsPage = () => (
  <div className="page-content">
    <PageHeader eyebrow="Brand system" title="Brand Assets" description="Prepare reusable identity and contact details for consistent CTAs." action={<button className="primary-button" disabled>Add asset</button>} />
    <section className="content-card split-card"><div><span className="eyebrow">Future asset types</span><h2>Everything your CTA needs</h2><div className="tag-list">{assetTypes.map((asset) => <span key={asset}>{asset}</span>)}</div></div><EmptyState icon="◉" title="No brand assets yet" description="Uploads and persistent storage will be connected in a later phase." /></section>
  </div>
)

export default BrandAssetsPage

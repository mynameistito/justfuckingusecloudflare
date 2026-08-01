/**
 * Legal and navigation footer for the independent guide.
 *
 * @returns The site footer.
 */
export function SiteFooter() {
	return (
		<footer className="site-footer">
			<div>
				<strong>JUST FUCKING USE CLOUDFLARE.</strong>
				<p>A practical, opinionated guide to building on Cloudflare.</p>
			</div>
			<nav aria-label="Footer">
				<a href="#stack-builder">Stack Builder</a>
				<a href="#platform">Platform</a>
				<a href="#architecture">Architecture</a>
				<a
					href="https://developers.cloudflare.com/"
					target="_blank"
					rel="noreferrer"
					aria-label="Cloudflare documentation (opens in a new tab)"
				>
					Official Docs
				</a>
			</nav>
			<p className="disclaimer">
				Independent and unofficial. Not affiliated with or endorsed by Cloudflare,
				Inc. Cloudflare and its product names are trademarks of their respective
				owners.
			</p>
		</footer>
	);
}

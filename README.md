<div align="center">
<img width="1200" alt="Just Fucking Use Cloudflare" src="./public/opengraph.png" />
</div>

# Just Fucking Use Cloudflare

> A satirical, high-performance landing page dedicated to saving developers from AWS egress hell and infrastructure complexity by advocating for the Cloudflare ecosystem.

[![React](https://img.shields.io/badge/React-19.2.3-61DAFB?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.3.0-646CFF?logo=vite)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.18-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

## 🎯 About

This project is a modern, opinionated landing page that makes a compelling (and slightly profane) case for using Cloudflare's platform instead of juggling multiple AWS services. Built with React and Vite, optimized for Cloudflare Pages deployment, and designed to be fast, accessible, and maintainable.

> This project is satire and for educational/demo purposes only; it is not official guidance from any cloud provider.

### Cloudflare Key Features

- ⚡ **Zero cold starts** - Edge computing that actually works
- 🌍 **300+ edge locations** worldwide
- 💰 **Free tier that's actually usable**
- 📦 **No egress fees** on R2 storage
- 🗄️ **SQLite at the edge** with D1
- 📊 **Unlimited bandwidth** on Pages
- 🤖 **Workers AI** at the edge
- 🔄 **Real preview deployments**
- 🔗 **Git integration** that just works
- 🔒 **Free SSL certificates** and DDoS protection included

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ (or **Bun**)
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mynameistito/justfuckingusecloudflare.git
   cd justfuckingusecloudflare
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   bun install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   bun run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

The development server will automatically reload when you make changes.

## 📦 Build for Production

Build the project for production:

```bash
npm run build
# or
bun run build
```

The optimized build output will be in the `dist` directory, ready for deployment.

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
# or
bun run preview
```

## ☁️ Deploy to Cloudflare Pages

This project is optimized for Cloudflare Pages deployment. The build configuration is already set up for seamless deployment.

### Quick Deploy

1. Push your code to GitHub, GitLab, or Bitbucket
2. In the Cloudflare Dashboard, go to **Workers & Pages** > **Create application** > **Pages**
3. Connect your repository
4. Configure build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** `/` (leave empty)
5. Click **Save and Deploy**

Your site will be live in seconds! 🎉

### Manual Deployment

You can also deploy manually using Wrangler:

```bash
npm install -g wrangler
wrangler pages deploy dist
```

## 🛠️ Tech Stack

- **[React 19](https://react.dev/)** - UI library
- **[Vite 7](https://vitejs.dev/)** - Build tool and dev server
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[React Router](https://reactrouter.com/)** - Client-side routing
- **[Lucide React](https://lucide.dev/)** - Icon library
- **[Biome](https://biomejs.dev/)** - Fast formatter and linter
- **[Husky](https://typicode.github.io/husky/)** - Git hooks

## 📁 Project Structure

```
justfuckingusecloudflare/
├── src/
│   ├── components/          # React components
│   │   ├── comparison.tsx    # AWS vs Cloudflare comparison
│   │   ├── cta.tsx          # Call-to-action section
│   │   ├── features.tsx     # Features showcase
│   │   ├── footer.tsx       # Footer component
│   │   ├── hero.tsx         # Hero section
│   │   └── rant.tsx         # The main rant section
│   ├── pages/               # Page components (if needed)
│   ├── app.tsx              # Main app component
│   ├── index.tsx            # React entry point
│   ├── index.html           # HTML entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
│   └── opengraph.png        # Open Graph image
├── dist/                    # Build output (generated)
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
├── biome.jsonc              # Biome linter/formatter config
├── package.json             # Dependencies and scripts
└── wrangler.jsonc           # Cloudflare Workers/Pages config
```

## 🧪 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run fix` - Auto-fix linting and formatting issues
- `npm run check` - Check for linting and formatting issues
- `npm run ultracheck` - Fix and check all issues
- `npm run tsc` - Type check without emitting files

## 🎨 Development

### Code Quality

This project uses:
- **Biome** for fast linting and formatting
- **TypeScript** for type safety
- **Husky** for pre-commit hooks

Run `npm run fix` before committing to ensure code quality.

### Styling

The project uses Tailwind CSS 4 with a custom design system:
- Dark theme with orange accent colors (`#F6821F`)
- Custom fonts: Anton (headings), JetBrains Mono (monospace), Space Grotesk (body)
- Responsive design with mobile-first approach

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Open an issue for bugs or feature requests
- Submit a pull request with improvements
- Share feedback or suggestions

## 📄 License

This project is licensed under the terms specified in the [LICENSE](./LICENSE) file.

## ⚖️ Legal

This is a community-built, satirical, open-source project. It is not endorsed by, sponsored by, or affiliated with any of the companies mentioned.

"Cloudflare", "Cloudflare Workers", "Cloudflare Pages", "Cloudflare R2", and "Cloudflare D1" are trademarks or registered trademarks of Cloudflare, Inc.  
"Amazon Web Services", "AWS", and related service names are trademarks of Amazon.com, Inc. or its affiliates.  
"Google Cloud", "Google", and related service names are trademarks of Google LLC.  
All other product names, logos, and brands are property of their respective owners and are used for identification and comparative purposes only.

Software is provided "as is", without warranty of any kind. You are responsible for complying with each provider’s Terms of Service and Acceptable Use Policy.

## 🔒 Privacy, Analytics & Cookies

This project uses privacy-conscious analytics to understand how the site is used and to improve the content over time.

- **Analytics tooling**  
  - Analytics is provided by **Google Analytics**, delivered through **Cloudflare Zaraz**.  
  - Cloudflare Zaraz acts as a proxy, so Google’s scripts are not loaded directly from your browser.

- **IP handling**  
  - Cloudflare Zaraz’s **“Hide originating IP address”** feature is enabled.  
  - This means **Google Analytics does not receive your raw IP address**. Instead, GA only sees IP information proxied by Cloudflare, which reduces how directly identifiable the analytics data is.

- **What is generally collected**  
  - High-level usage data such as:
    - Pages visited and basic navigation paths  
    - Timestamps and approximate visit duration  
    - Approximate location (for example, country/region), derived from network data  
    - Device and browser information (for example, desktop vs mobile, browser family)  
    - Referrer information (for example, which site or campaign sent you here, if available)  
  - The project maintainers intentionally avoid sending **direct identifiers** (such as names, emails, or raw user IDs) into Google Analytics events.

- **Why this data is collected**  
  - To understand which parts of the site are most useful or confusing.  
  - To prioritize improvements and content updates.  
  - **Not** for ads, behavioral profiling, or selling user data.

- **Who processes the data**  
  - **Cloudflare** provides the infrastructure and Zaraz proxy/consent tooling.  
  - **Google** acts as the analytics provider that receives pseudonymized/aggregated usage data.  
  - Data may be processed outside of New Zealand, including in the United States or other regions where Cloudflare and Google operate.

- **Consent and cookies**  
  - If you see a **consent modal** on the live site, it is powered by **Cloudflare Zaraz Consent Management (CMP)**.  
  - Tools like Google Analytics are associated with an **“Analytics” purpose** and are only loaded when you consent to that purpose.  
  - Your consent preferences are stored in a **first-party cookie** managed by Cloudflare Zaraz, which records which purposes you have accepted or declined.

- **Your controls**  
  - You can:
    - Use the on-site consent controls (where available) to accept or decline analytics.  
    - Reopen the consent modal via any **“Cookie settings” / “Privacy settings”** link exposed by the site implementation.  
    - Use your browser settings, extensions, or privacy tools to block analytics or cookies entirely.

## 🧭 Privacy maintenance

- This project may evolve over time (for example, adding or removing tools in Cloudflare Zaraz or changing Google Analytics property settings).  
- When the analytics setup changes, the maintainers should update:
  - This `README.md` section, and  
  - The `/privacy-policy` page in the app  
  so that they continue to accurately describe what is happening.
- If you notice something that seems inconsistent or unclear from a privacy perspective, please open an issue in the repository so it can be reviewed and fixed.

## 🔗 Cloudflare Links

- [Cloudflare Pages](https://pages.cloudflare.com/)
- [Cloudflare Workers](https://workers.cloudflare.com/)
- [Cloudflare R2](https://www.cloudflare.com/products/r2/)
- [Cloudflare D1](https://developers.cloudflare.com/d1/)

---

**Made with ❤️ (and a healthy dose of frustration with AWS billing)**

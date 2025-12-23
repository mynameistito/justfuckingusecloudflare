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

## 🔗 Links

- [Cloudflare Pages](https://pages.cloudflare.com/)
- [Cloudflare Workers](https://workers.cloudflare.com/)
- [Cloudflare R2](https://www.cloudflare.com/products/r2/)
- [Cloudflare D1](https://developers.cloudflare.com/d1/)

---

**Made with ❤️ (and a healthy dose of frustration with AWS billing)**

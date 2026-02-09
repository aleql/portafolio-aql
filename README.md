# Alejandro Quijada Leyton - Portfolio

A modern, minimalist portfolio website showcasing professional experience, projects, and skills. Built with React, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- Modern and minimalist design
- Rich animations powered by Framer Motion
- Fully responsive (mobile, tablet, desktop)
- Fast performance with Vite
- Smooth scrolling navigation
- Deployable to GitHub Pages

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd portofoloio-final
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Building for Production

```bash
npm run build
```

This will create an optimized production build in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Deployment to GitHub Pages

### First-time Setup

1. Make sure your repository is initialized with git:
```bash
git init
git add .
git commit -m "Initial commit"
```

2. Create a GitHub repository and push your code:
```bash
git remote add origin <your-github-repo-url>
git branch -M main
git push -u origin main
```

3. Update the `base` path in `vite.config.ts` to match your repository name:
```typescript
base: '/your-repo-name/',
```

### Deploy

Run the deployment command:
```bash
npm run deploy
```

This will:
1. Build the project
2. Deploy to the `gh-pages` branch
3. Make it available at `https://your-username.github.io/your-repo-name/`

### Configure GitHub Pages

After deploying, go to your repository settings on GitHub:
1. Navigate to **Settings** -> **Pages**
2. Under **Source**, select **gh-pages** branch
3. Click **Save**

Your portfolio will be live at `https://your-username.github.io/your-repo-name/`

## Project Structure

```
portofoloio-final/
- src/
  - components/          # React components
    - common/            # Reusable components
    - Navigation.tsx
    - Hero.tsx
    - Summary.tsx
    - Experience.tsx
    - Projects.tsx
    - Skills.tsx
    - Education.tsx
    - Footer.tsx
  - data/
    - portfolio.ts       # Portfolio data
  - hooks/
    - useScrollAnimation.ts
  - styles/
    - globals.css
  - App.tsx
  - main.tsx
- public/
- index.html
- package.json
- vite.config.ts
- tailwind.config.js
- tsconfig.json
```

## Customization

### Update Portfolio Content

Edit `src/data/portfolio.ts` to update your:
- Personal information
- Professional summary
- Work experience
- Projects
- Skills
- Education
- Research roles

### Modify Design

- **Colors**: Edit `tailwind.config.js` to change the color scheme
- **Fonts**: Update Google Fonts in `index.html` and `tailwind.config.js`
- **Animations**: Adjust Framer Motion settings in component files

## Performance

- Built with Vite for fast builds and optimal performance
- Code splitting and lazy loading
- Optimized images and assets
- Smooth animations that don't impact performance

## License

MIT License - feel free to use this template for your own portfolio!

## Author

**Alejandro Quijada Leyton**
- Email: alejandroquijadaleyton@gmail.com
- LinkedIn: [linkedin.com/in/alejandro-quijada-leyton-b364b5235](https://www.linkedin.com/in/alejandro-quijada-b364b5235/)
- GitHub: [github.com/aleql](https://github.com/aleql)
- Portfolio: [eye-search.ucl.ac.uk](https://eye-search.co.uk/)

---

Built with heart using React & TypeScript

# Naphat Thammatheero - Personal Portfolio

A modern, interactive personal portfolio website built to showcase my projects, skills, and experience as a Full Stack Developer. It features a clean UI, smooth animations, and a 3D loading sequence.

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js 15 (App Router), React 19, and TypeScript.
- **Responsive Design**: Fully responsive layout styled beautifully with Tailwind CSS.
- **Interactive Animations**: Smooth transitions and scroll effects powered by Framer Motion.
- **3D Loading Screen**: Eye-catching initial loading sequence using Three.js and React Three Fiber.
- **Multi-language Support (i18n)**: Seamless language switching context built-in.
- **Organized Data structure**: Easy to update portfolio content via `src/data/portfolio.ts`.
- **SEO Optimized**: Fully configured Next.js Metadata including Open Graph and Twitter cards.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Library**: [React](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **3D Graphics**: [Three.js](https://threejs.org/) & [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🏃‍♂️ Getting Started

### Prerequisites

Make sure you have Node.js (v18 or higher recommended) and npm/yarn/pnpm installed.

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   cd my-portfolio-naphat
   ```

2. Install the dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

- `src/app/` - Next.js App Router (Layouts, Pages, Global CSS)
- `src/components/` - Reusable React components (UI, Sections, 3D Canvas)
- `src/context/` - React Context providers (Language context)
- `src/data/` - Static data for the portfolio (Projects, Skills, Personal Info)
- `public/` - Static assets like images and graphics

## ⚙️ Customization

To update the portfolio with your own information:
1. Navigate to `src/data/portfolio.ts`
2. Update the `personalInfo`, `skills`, and `projects` objects.
3. Replace images in the `public/images/` directory.

## 🚀 Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.
Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

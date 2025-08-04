# Mini Website Builder

A drag-and-drop website builder built with Next.js 14, TypeScript, and Tailwind CSS for the Rekaz technical assessment.

## Live Demo

**[View Live Demo →](https://rekaz-website-builder.vercel.app/)**

## Features

- **Section Library**: Pre-built sections (Header, Hero, Features, Footer) - click to add
- **Live Preview**: Real-time preview as you build
- **Drag & Drop**: Reorder sections by dragging
- **Edit Sections**: Click edit icon to modify content
- **Import/Export**: Save and load designs as JSON files
- **Fully Responsive**: Works on desktop, tablet, and mobile
- **Mobile Optimized**: Collapsible sidebar and touch-friendly controls

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Zustand (State Management)
- @dnd-kit (Drag and Drop)
- Framer Motion (Animations)

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How to Use

1. **Add Sections**: Click any section in the left sidebar
2. **Edit Content**: Hover over a section and click the edit (✏️) button
3. **Reorder**: Drag sections using the handle (⋮⋮) button
4. **Delete**: Click the trash (🗑️) button to remove a section
5. **Export/Import**: Use toolbar buttons to save/load your designs

## Build for Production

```bash
npm run build
npm start
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

This project is already deployed at: https://rekaz-website-builder.vercel.app/

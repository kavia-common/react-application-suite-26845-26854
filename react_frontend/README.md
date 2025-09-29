# VizAI Frontend (React + Tailwind + Vite)

Elegant wildlife-themed UI with dashboard, upload, and YOLO analysis mock.

## Quick start
1. Install dependencies
   - npm install
2. Start development server
   - npm run dev
3. Build for production
   - npm run build
4. Preview production build
   - npm run preview

## Tech
- React 18
- Vite
- Tailwind CSS
- React Router
- Recharts

## Structure
src/
- App.jsx — routes
- main.jsx — entry point
- index.css — styles (Tailwind)
- layout/
  - Layout.jsx — base layout with Sidebar and Topbar
- shared/
  - Sidebar.jsx
  - Topbar.jsx
- components/
  - Card.jsx
  - UploadDropzone.jsx — drag-and-drop + preview
  - YoloMock.jsx — mock bounding boxes overlay
  - Metric.jsx — small KPI badge
- pages/
  - Dashboard.jsx — widgets and charts
  - Upload.jsx — uploader
  - Analysis.jsx — YOLO mock analysis
  - NotFound.jsx

## Theming
- Wildlife-inspired green/blue gradient background via Tailwind `bg-wildlife-gradient`
- Colors configured in tailwind.config.js (brand palette)
- Light/Dark mode with `dark` class (Topbar toggle)

## Notes
- Analysis page uses a mock image and randomly generated bounding boxes and stats to simulate YOLO output. Replace `runAnalysis` with real API calls when backend is available.

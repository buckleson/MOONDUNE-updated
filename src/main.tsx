import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Prerendered pages ship static head tags; the app re-renders them, so drop the snapshot copies.
document.querySelectorAll('head [data-seo]').forEach((el) => el.remove())
// Enables JS-only polish (scroll reveals); the static snapshot never hides content.
document.documentElement.classList.add('js')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

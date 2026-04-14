import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// Global polyfills required by @initia/initia.js BCS serialization
import { Buffer } from 'buffer'
window.Buffer = Buffer
window.global = window
// @ts-ignore
window.process = { env: {} }
// @ts-ignore
import util from 'util'
// @ts-ignore
window.util = util || { inspect: { custom: Symbol('util.inspect.custom') } }

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

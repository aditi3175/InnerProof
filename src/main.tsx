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

// @ts-ignore
import interwovenStyles from '@initia/interwovenkit-react/styles.js'
import App from './App.tsx'

const CUSTOM_SIDEBAR_CSS = `
  /* Sidebar drawer styling for wallet widget */
  :host {
     --ik-modal-width: 440px !important;
  }
  
  main[class*="svelte-"], [role="dialog"][class*="svelte-"] {
    position: fixed !important;
    top: 0 !important;
    right: 0 !important;
    left: auto !important;
    transform: none !important;
    margin: 0 !important;
    height: 100vh !important;
    width: 440px !important;
    max-width: 90vw !important;
    border-radius: 0 !important;
    border-left: 1px solid rgba(255, 255, 255, 0.1) !important;
    background: #0f0e17 !important;
    box-shadow: -20px 0 80px rgba(0, 0, 0, 0.9) !important;
    display: flex !important;
    flex-direction: column !important;
    overflow-y: auto !important;
    padding: 60px 24px 24px 24px !important; 
    z-index: 1000000 !important;
    visibility: visible !important;
    opacity: 1 !important;
  }

  header, div[class*="header"], div[class*="top-bar"] {
    position: absolute !important;
    top: 20px !important;
    left: 20px !important;
    background: none !important;
    border: none !important;
    padding: 0 !important;
    margin: 0 !important;
    width: 32px !important;
    height: 32px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }

  header button, div[class*="header"] button, .close-button, button[aria-label*="Close"] {
    background: none !important;
    border: none !important;
    color: rgba(255, 255, 255, 0.6) !important;
    width: 24px !important;
    height: 24px !important;
    padding: 0 !important;
    margin: 0 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    cursor: pointer !important;
    transition: color 0.2s ease !important;
    box-shadow: none !important;
  }

  header button:hover, button[aria-label*="Close"]:hover {
    color: white !important;
  }

  .custom-wallet-heading {
    color: white !important;
    font-size: 1.6rem !important;
    font-weight: 800 !important;
    margin-bottom: 24px !important;
    margin-top: 5px !important;
    font-family: inherit !important;
    letter-spacing: -0.02em !important;
    display: block !important;
  }

  h2, h2[class*="title"], [class*="group-label"] {
    display: none !important;
    height: 0 !important;
    margin: 0 !important;
    visibility: hidden !important;
  }

  button:not(.close-button):not([aria-label*="Close"]) {
    transition: all 0.3s ease !important;
    margin-bottom: 12px !important;
    display: flex !important;
    align-items: center !important;
    width: 100% !important;
    background: rgba(255, 255, 255, 0.03) !important;
    border: 1px solid rgba(255, 255, 255, 0.05) !important;
    padding: 16px !important;
    border-radius: 14px !important;
  }
  
  button:not(.close-button):not([aria-label*="Close"]):hover {
    transform: translateX(-10px) !important;
    background: rgba(108, 99, 255, 0.12) !important;
    border-color: rgba(108, 99, 255, 0.4) !important;
  }

  button img {
    border-radius: 9px !important;
    margin-right: 16px !important;
    width: 38px !important;
    height: 38px !important;
  }
`;

function injectIntoAllShadowRoots(parent: Element | ShadowRoot = document.body) {
  const allElements = (parent as Element).querySelectorAll ? (parent as Element).querySelectorAll('*') : [];
  allElements.forEach(el => {
    if (el.shadowRoot) {
      if (!el.shadowRoot.querySelector('#wallet-sidebar-styles')) {
        const style = document.createElement('style');
        style.id = 'wallet-sidebar-styles';
        style.innerHTML = String(interwovenStyles) + CUSTOM_SIDEBAR_CSS;
        el.shadowRoot.appendChild(style);
      }

      const isWalletWidget = el.tagName === 'INITIA-WALLET-WIDGET' || el.tagName === 'INTERWOVEN-KIT' || el.tagName === 'INITIA-ONBOARD';
      if (isWalletWidget) {
        const container = el.shadowRoot.querySelector('main') || el.shadowRoot.querySelector('[role="dialog"]');
        if (container && !el.shadowRoot.querySelector('.custom-wallet-heading')) {
          const heading = document.createElement('div');
          heading.className = 'custom-wallet-heading';
          heading.innerText = 'Select your wallet';
          container.prepend(heading);
        }
      }

      injectIntoAllShadowRoots(el.shadowRoot);
    }
  });
}

// Use MutationObserver instead of setInterval for performance.
// Only runs when DOM actually changes, not every 500ms.
const observer = new MutationObserver(() => {
  injectIntoAllShadowRoots();
});
observer.observe(document.body, { childList: true, subtree: true });

// Run once on load as well
requestAnimationFrame(() => injectIntoAllShadowRoots());

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

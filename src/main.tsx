import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// import { PlasmicRootProvider } from '@plasmicapp/loader-react';
// import { PLASMIC } from '../plasmic-init';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <PlasmicRootProvider loader={PLASMIC}> */}
      <App />
    {/* </PlasmicRootProvider> */}
  </StrictMode>,
)

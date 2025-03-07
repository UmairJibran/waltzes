import React from 'react';
import { createRoot } from 'react-dom/client';
import { JobApplicationPopup } from './components/JobApplicationPopup';
import './styles/tailwind.css';

// Create container for our app
const container = document.createElement('div');
container.id = 'job-application-extension-root';
document.body.appendChild(container);

// Create root and render app
const root = createRoot(container);

// Function to remove the popup
const removePopup = () => {
  const root = document.getElementById('job-application-extension-root');
  if (root) {
    root.remove();
  }
};

// Render the popup
root.render(
  <React.StrictMode>
    <JobApplicationPopup onClose={removePopup} />
  </React.StrictMode>
);

import React from 'react';

// Small set of typography primitives used across the app.
// Keeps page headings and body text consistent and easy to change.
export const PageTitle = ({ children, className = '' }) => (
  <h1 className={`text-heading text-textPrimary font-semibold mb-4 ${className}`}>{children}</h1>
);

export const SectionTitle = ({ children, className = '' }) => (
  <h2 className={`text-subheading text-textPrimary font-medium mb-2 ${className}`}>{children}</h2>
);

export const Paragraph = ({ children, className = '' }) => (
  <p className={`text-body text-textSecondary ${className}`}>{children}</p>
);

// Note: no default export to keep Fast Refresh / HMR consistent with plugin-react

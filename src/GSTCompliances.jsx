import React from 'react';
import { PageTitle, Paragraph } from './components/Typography';

// A minimal "coming soon" page intentionally without the top-right user header
const GSTCompliances = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <PageTitle>GST Compliances</PageTitle>
        <Paragraph className="mt-2">GST Compliances - Coming Soon</Paragraph>
      </div>
    </div>
  );
};

export default GSTCompliances;

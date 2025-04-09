// admin/config.tsx
import { jsx } from '@keystone-ui/core';
import React from 'react';

function CustomLogo() {
  return (
    <img
      src="/images/dunes_logo.a0f45c42.svg" // Path to your custom logo
      alt="My Custom Logo"
      
      
    />
    
  );
}

export const components = {
  Logo: CustomLogo,
};

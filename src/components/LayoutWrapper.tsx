'use client';

import React from 'react';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <main style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minHeight: '100vh' }}>
      {children}
    </main>
  );
}

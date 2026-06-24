import type { Metadata } from 'next';
import './globals.css';
import LayoutWrapper from '../components/LayoutWrapper';

export const metadata: Metadata = {
  title: 'TeenHelpline Student Portal',
  description: 'Manage your wellness goals, view scheduled counselor sessions, and browse academic marketplace options.',
  icons: {
    icon: '/logo_icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo_icon.png" />
      </head>
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}

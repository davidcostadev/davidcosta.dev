import { GoogleAnalytics } from '@next/third-parties/google';

import 'assets/global.css';
import 'assets/prism.css';
import { ThemeProvider } from 'next-themes';
import { Metadata } from 'next';

import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';

export const metadata: Metadata = {
  title: 'davidcosta.dev',
  description: "David Costa home's page",
  metadataBase: new URL('https://davidcosta.dev'),
  robots: {
    index: true,
    googleBot: {
      index: true,
    },
  },
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="antialiased leading-base bg-background-light dark:bg-background-dark text-primary-light dark:text-primary-dark text-lg relative"
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId="G-K9H9MZSB1Q" />
    </html>
  );
}

import Link from 'next/link';
// import { ThemeProvider } from '../context/ThemeContext';
import 'assets/global.css';
import 'assets/prism.css';
// import ThemeToggle from '../components/ThemeToggle';
import { ThemeProvider } from 'next-themes';
// import { ThemesProvider } from '../context/ThemeProviderTheme';
import { Footer } from '../components/Footer';

import { Navbar } from '../components/Navbar';

export const metadata = {
  title: 'davidcosta.dev',
  description: "David Costa home's page",
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
      <body className="antialiased leading-base bg-background-light dark:bg-background-dark text-primary-light dark:text-primary-dark text-lg">
        <ThemeProvider attribute="class">
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

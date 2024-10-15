import { GoogleAnalytics } from '@next/third-parties/google';

import { Volkhov, Lato, Fira_Code } from 'next/font/google';
// import { usePathname } from 'next/navigation';

import { unstable_setRequestLocale } from 'next-intl/server';

import 'assets/global.css';
import 'assets/prism.css';
import { ThemeProvider } from 'next-themes';
import { LanguageProvider } from 'context/LanguageContext';
import { Metadata } from 'next';

import { Footer } from 'components/Footer';
import { Navbar } from 'components/Navbar';

const volkhov = Volkhov({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
  variable: '--font-volkhov',
});

const lato = Lato({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
  variable: '--font-lato',
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
  variable: '--font-fira-code',
});

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

type LayoutProps = {
  children: React.ReactNode;
  params: { locale: string };
};

export default function RootLayout({ children, params: { locale } }: LayoutProps) {
  // const pathname = usePathname() ?? '';
  // const lang = pathname.includes('pt-br') ? 'pt-br' : 'en';
  unstable_setRequestLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`antialiased leading-base bg-background-light dark:bg-background-dark text-primary-light dark:text-primary-dark text-lg relative ${volkhov.variable} ${lato.variable} ${firaCode.variable}`}
        suppressHydrationWarning
      >
        <LanguageProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <Navbar />
            {children}
            <Footer />
          </ThemeProvider>
        </LanguageProvider>
      </body>
      <GoogleAnalytics gaId="G-K9H9MZSB1Q" />
    </html>
  );
}

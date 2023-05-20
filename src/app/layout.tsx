import Link from 'next/link';

import 'assets/global.css';
import 'assets/prism.css';

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
    <html lang="en" className="dark" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <header className="relative">
          <div className="absolute top-0 left-0 w-full z-50 px-2 py-4 bg-gray-900 bg-opacity-90">
            <div className="max-w-3xl m-auto flex justify-between items-center">
              <h1 className="text-2xl font-medium ml-2">
                <Link href="/" className="text-primary hover:text-purple-400">
                  David Costa
                </Link>
              </h1>
              <nav>
                <ul className="flex">
                  <li className="text-lg font-medium">
                    <Link href="/blog" className="text-secondary hover:text-purple-400 px-3 py-2">
                      Blog
                    </Link>
                  </li>
                  <li className="text-lg font-medium">
                    <Link
                      href="/projects"
                      className="text-secondary hover:text-purple-400 px-3 py-2"
                    >
                      Projects
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>
        {children}
        <footer className="border-t border-gray-800">
          <p className="text-center text-secondary py-2 text-sm">© 2023 David Costa</p>
        </footer>
      </body>
    </html>
  );
}

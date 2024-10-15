import { BackgroundRetro } from 'app/[locale]/home/BackgroundRetro';

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

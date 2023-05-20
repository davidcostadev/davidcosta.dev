import { BackgroundRetro } from 'app/home/BackgroundRetro';

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BackgroundRetro className="w-full h-72 sm:h-80 md:h-96" />
      {children}
    </>
  );
}

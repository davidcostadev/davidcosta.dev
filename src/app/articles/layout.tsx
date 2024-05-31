export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="px-5 sm:px-12 max-w-4xl mx-auto min-h-screen">
      <article className="">{children}</article>
    </main>
  );
}

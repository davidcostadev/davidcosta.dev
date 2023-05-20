export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-3xl m-auto px-2 sm:px-6 mb-7 pt-20">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg px-4 py-6 sm:py-8 sm:px-10 leading-relaxed">
        {children}
      </div>
    </div>
  );
}

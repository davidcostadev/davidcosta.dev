// The real root layout is [locale]/layout.tsx; this one only exists so the
// app-level not-found page below has a layout to render in.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}

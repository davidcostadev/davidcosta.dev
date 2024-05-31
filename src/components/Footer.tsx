export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800">
      <p className="text-center text-secondary py-2 text-base">© {year} David Costa</p>
    </footer>
  );
};

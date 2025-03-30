import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="max-w-7xl mx-auto">
      <body>{children}</body>
    </html>
  );
}

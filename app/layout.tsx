import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Aniket's Assignment",
  description: "Frontend Intern Take-Home Task for SnapMyDesign: Building a Resume Experience Editor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}

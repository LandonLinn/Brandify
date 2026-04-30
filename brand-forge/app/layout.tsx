import type { Metadata } from "next";
import { inter } from "./font";
import "./globals.css";

// Components
import Header from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { AppProvider } from "./context/AppContext";
import LoadingModal from "@/components/ui/LoadingModal";

export const metadata: Metadata = {
  title: "BrandForge | AI Powered Brand Kit",
  description: "Generate your business's brand kit in seconds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AppProvider >
          {/* Header */}
          <Header />
          <LoadingModal />
          {children}
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}

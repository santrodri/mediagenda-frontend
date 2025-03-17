import type { Metadata } from "next";
import { Inter } from "next/font/google"
import StoreProvider from "@/providers/StorageProvider";
import ThemeProvider from "@/providers/ThemeProvider";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MediaGenda - Agendamento de Consultas Médicas",
  description: "Sistema de agendamento de consultas médicas",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <StoreProvider>
            <ThemeProvider>
                {children}
            </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}

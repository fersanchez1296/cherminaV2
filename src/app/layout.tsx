import { Outfit } from "next/font/google";
import "./globals.css";
import "swiper/swiper-bundle.css";
import "simplebar-react/dist/simplebar.min.css";
import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";
import SessionAuthProvider from "../context/SessionAuthProvider";
import { ModalProvider } from "@/context/ModalManager";
import { NotificationProvider } from "@/context/NotificationProvider";
import { LoaderOverlay } from "@/components/loaderOverlay/LoaderOverlay";
const outfit = Outfit({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <SessionAuthProvider>
          <NotificationProvider>
            <ThemeProvider>
              <LoaderOverlay/>
              <ModalProvider>
                <SidebarProvider>{children}</SidebarProvider>
              </ModalProvider>
            </ThemeProvider>
          </NotificationProvider>
        </SessionAuthProvider>
      </body>
    </html>
  );
}

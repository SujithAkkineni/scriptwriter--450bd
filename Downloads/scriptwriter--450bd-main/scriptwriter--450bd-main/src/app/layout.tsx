import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { FontProvider } from '@/context/font-context';

export const metadata: Metadata = {
  title: 'Screenwriter Studio',
  description: 'The collaborative screenwriting application.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto:wght@400;500;700&family=Lato:wght@400;700&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,700;1,8..60,400&family=Courier+Prime:wght@400;700&family=Noto+Sans:wght@400;700&family=Open+Sans:wght@400;700&family=Merriweather:wght@400;700&family=Inconsolata:wght@400;700&family=Playfair+Display:wght@400;700&family=Montserrat:wght@400;700&family=PT+Serif:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-inter antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <FontProvider>
            {children}
            <Toaster />
          </FontProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

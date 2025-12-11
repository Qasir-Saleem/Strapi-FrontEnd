// app/layout.jsx
import { Inter, Baskervville } from "next/font/google";
import "./globals.css";

// Replace Geist fonts with Inter & Baskervville
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-inter",
});

const baskervville = Baskervville({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-baskervville",
});


export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${baskervville.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

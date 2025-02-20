import { Poppins } from "next/font/google";
import "./globals.css";
import LenisSmooth from "./(components)/LenisSmooth";
import Navbar from "./(components)/Navbar";
import Footer from "./(components)/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "SUPCON",
  description:
    "Digitalizing Oil & Gas: SUPCON's Role in Operational Excellence",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`font-poppins ${poppins.variable} antialiased`}
      >
        <LenisSmooth />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

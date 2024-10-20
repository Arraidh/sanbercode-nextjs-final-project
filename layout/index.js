import { Poppins } from "next/font/google";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function Layout({ children }) {
  return (
    <>
      <div
        className={`${poppins.className} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] relative`}
      >
        <Navbar />
        <main className="w-full flex flex-col gap-8 row-start-2 justify-center items-center !font-sans">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}

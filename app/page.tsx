import Link from "next/link";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "600", "700"], display: "swap" });

export default function Home() {
  return (
    <main className={`${montserrat.className} min-h-screen bg-[#f5f7fa] text-[#1b1b1b] p-4 sm:p-10`}>
      <section className="mx-auto max-w-4xl rounded-lg border border-[#d8d8d8] bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-[#224c87]">FinCal Calculator Hub</h1>
        <p className="mt-2 text-[#555]">Choose a calculator to begin. Live, intuitive, and accessible.</p>

        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          <li>
            <Link
              href="/sip"
              className="block rounded-lg border border-[#224c87] px-4 py-3 text-[#224c87] font-semibold hover:bg-[#e6edfc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#224c87]"
            >
              SIP Calculator
            </Link>
          </li>
          <li>
            <Link
              href="/swp"
              className="block rounded-lg border border-[#224c87] px-4 py-3 text-[#224c87] font-semibold hover:bg-[#e6edfc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#224c87]"
            >
              SWP Calculator
            </Link>
          </li>
          <li>
            <div className="block rounded-lg border border-[#919090] px-4 py-3 text-[#919090] bg-[#f7f7f7]" aria-disabled="true">
              Top-up SIP Calculator (planned)
            </div>
          </li>
          <li>
            <div className="block rounded-lg border border-[#919090] px-4 py-3 text-[#919090] bg-[#f7f7f7]" aria-disabled="true">
              Goal-Based Calculator (planned)
            </div>
          </li>
        </ul>
      </section>
      <footer className="mt-6 text-xs text-[#555]">
        <p>
          Note: this implementation demonstrates the SIP calculator and adheres to compliance and accessibility guidelines.
        </p>
      </footer>
    </main>
  );
}

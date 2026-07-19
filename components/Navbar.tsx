import { siteConfig } from "@/lib/site";

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-[100] border-b border-white/10 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <a
          href="#"
          className="text-lg font-black tracking-tight text-white transition hover:text-emerald-400"
        >
          {siteConfig.name}
        </a>

        <nav className="hidden items-center gap-8 text-sm font-semibold text-white md:flex">
          <a
            href="#services"
            className="transition hover:text-emerald-400"
          >
            Services
          </a>

          <a
            href="#process"
            className="transition hover:text-emerald-400"
          >
            How It Works
          </a>

          <a
            href="#contact"
            className="transition hover:text-emerald-400"
          >
            Contact
          </a>

          <a
            href={siteConfig.phoneHref}
            className="rounded-md bg-emerald-600 px-5 py-3 text-white transition hover:bg-emerald-500"
          >
            Call Now
          </a>
        </nav>

        <a
          href={siteConfig.phoneHref}
          className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-emerald-500 md:hidden"
        >
          Call
        </a>
      </div>
    </header>
  );
}
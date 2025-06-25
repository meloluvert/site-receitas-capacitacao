import Link from "next/link";

export default function Header() {
  return (
    <header className=" w-full bg-white text-black p-4 sm:py-4 sm:px-0 border-b border-slate-200 drop-shadow-lg">
      <div className=" flex justify-between container mx-auto">
          <Link className=" text-sm sm:text-xl font-bold hover:scale-105 transition-all" href={"/"}>Receitas  deliciosas</Link>
          <nav className="flex gap-6">
            <Link className="hover:text-orange-500 transition-colors text-sm sm:text-base" href="/">Início</Link>
            <Link className="hover:text-orange-500 transition-colors text-sm sm:text-base" href="/receitas">Receitas</Link>
          </nav>
      </div>
    </header>
  );
}

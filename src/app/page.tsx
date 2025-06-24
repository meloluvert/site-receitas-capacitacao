import { ChevronRight } from "lucide-react";
import Link from "next/link";
export default function Home() {
  return (
    <main className="flex-grow ">
      <section className=" gap-4 py-12  bg-orange-100">
        <div className="container flex flex-col gap-6 items-center mx-auto">
          <h1 className="text-5xl font-bold">Receitas Deliciosas</h1>
          <p className="text-xl">
            Descubra receitas simples e saborosas para todas as ocasiões
          </p>
          <Link
            className="bg-orange-500 text-white font-bold rounded-lg px-3 py-2 hover:bg-orange-700 transition-colors"
            href="/receitas"
          >
            Ver todas as receitas
          </Link>
        </div>
      </section>

      <section className="py-12">
        <div className=" flex flex-col items-center container mx-auto">
          <h2 className="text-lg font-bold">Receitas em Destaque</h2>

          <Link href="/receitas" className="flex text-orange-400 hover:text-orange-700 transition-colors">
          Ver todas as receitas
          <ChevronRight/>
          </Link>
        </div>
      </section>
    </main>
  );
}

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

      <section>
        <div className="container mx-auto">
          <h2>Receitas em Destaque</h2>

          <Link href="/receitas">
          Ver todas as receitas
          <ChevronRight/>
          </Link>
        </div>
      </section>
    </main>
  );
}

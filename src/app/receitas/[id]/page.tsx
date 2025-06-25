import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
export default function ReceitaPage() {
  return (
    <main className="flex-grow py-8">
      <div className="container mx-auto">
        <Link
          href="receitas "
          className="text-orange-500 hover:text-orange-700"
        >
          <ChevronLeft />
          Voltar para receitas
        </Link>

        <section>
          <div className="relative h-96 w-full">
            <Image src="" fill alt="a" />
          </div>

          <div>
            <h1>Título da receita</h1>
            <p>Descrição</p>

            <div>{/* componentes de info */}</div>

            <div>
              <div>{/* ingredientes */}</div>
              <div>{/* preparo + compoinete de paso de preparo*/}</div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

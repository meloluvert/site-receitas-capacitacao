import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { recipes } from "@/lib/data";
import { notFound } from "next/navigation";
interface RecipePageProps {
  params: {
    id: string;
  };
}
export default function ReceitaPage({ params }: RecipePageProps) {
  const recipe = recipes.find((recipe) => recipe.id === params.id);
  if (!recipe) {
    return notFound();
  }
  return (
    <main className="flex-grow py-8">
      <div className="container mx-auto mb-8">
        <Link
          href="receitas "
          className="text-orange-500 hover:text-orange-700"
        >
          <ChevronLeft />
          Voltar para receitas
        </Link>

        <section className="rounded-lg overflow-hidden shasow-md">
          <div className="relative h-96 w-full">
            <Image
              src={recipe.image}
              fill
              alt={recipe.title}
              className="object-cover"
            />
          </div>

          <div className=" flex flex-col p-6 gap-6">
            <div>
              <h1 className="text-3xl font-bold">{recipe.title}</h1>
              <p>{recipe.description}</p>
            </div>

            <div>{/* componentes de info */}</div>

            <div className="grid grid-cols-2">
              <div>
                <h2 className="text-xl font-bold mb-4">Ingredientes</h2>
                <ul className="list-disc list-inside space-y-2">
                  {recipe.ingredients.map((ingredient) => (
                    <li className="marker:text-orange-500">{ingredient}</li>
                  ))}
                </ul>
              </div>
              <div>
              <h2 className="text-xl font-bold mb-4">Modo de Preparo</h2>
                
                {/* preparo + compoinete de paso de preparo*/}</div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

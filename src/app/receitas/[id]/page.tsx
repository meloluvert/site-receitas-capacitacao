import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { recipes } from "@/lib/data";
import { notFound } from "next/navigation";
import InfoPill from "@/components/InfoPill";
import PreparationStep from "@/components/PreparationStep";
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
          href="/receitas "
          className="flex text-orange-500 hover:text-orange-700 mb-6"
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

            <div className="flex gap-4">
                <InfoPill title={"Preparo"} info={recipe.prepTime}/>
                <InfoPill title={"Cozimento"} info={recipe.cookTime}/>
                <InfoPill title={"Porções"} info={recipe.servings}/>
                <InfoPill title={"Categoria"} info={recipe.category}/>
            </div>

            <div className="grid grid-cols-2">
              <div>
                <h2 className="text-xl font-bold mb-4">Ingredientes</h2>
                <ul className="list-disc list-inside space-y-2">
                  {recipe.ingredients.map((ingredient) => (
                    <li key={ingredient} className="marker:text-orange-500">{ingredient}</li>
                  ))}
                </ul>
              </div>
              <div>
              <h2 className="text-xl font-bold mb-4">Modo de Preparo</h2>
              <ol className="space-y-4">
                {recipe.instructions.map((instruction, index) =>(
                    <PreparationStep key={index} index={index+1} description={instruction}/>
                )
                )}
              </ol>
                </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

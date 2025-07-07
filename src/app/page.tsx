"use client"
import { toast } from "sonner";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { RecipeCard } from "@/components/RecipeCard";
import { useEffect, useState } from "react";
import { Recipe } from "@/lib/data";
import api from "@/lib/api";
export default function Home() {
const [recipes,setRecipes] = useState<Recipe[]>([])
  useEffect(() => {
    const fecthRecipes = async () => {
      try {
        const response = await api.get("/recipes");

        setRecipes(response.data.slice(0, 3));
      } catch (error) {
        console.error("Erro ao requisitar receitas:", error);
        toast.error("Erro ao requisitar as receitas, tente novamente mais tarde");

      }
    };
    fecthRecipes();
  }, []);
  return (
    <main className="flex-grow ">
      <section className=" gap-4 py-12 px-2 md:px-0  bg-orange-100">
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

      <section className="py-12 px-2 md:px-0">
        <div className=" flex flex-col items-center container mx-auto gap-8">
          <h2 className="text-lg font-bold">Receitas em Destaque</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 w-full gap-8">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
          <Link
            href="/receitas"
            className="flex text-orange-400 hover:text-orange-700 transition-colors"
          >
            Ver todas as receitas
            <ChevronRight />
          </Link>
        </div>
      </section>
    </main>
  );
}

"use client";

import { RecipeCard } from "@/components/RecipeCard";
import { Recipe } from "@/lib/data";
import { Plus } from "lucide-react";
import RecipeFormModal from "@/components/RecipeFormModal";
import { useEffect, useState } from "react";
import DeleteConfirmationModal from "@/components/DeleteConfirmation";
import api from "@/lib/api";
import { toast } from "sonner";
export default function ReceitasPage() {
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false);

  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(
    undefined
  );

  //paara controlar o estado da pesquisa
  const [searchSentence, setSearchSentence] = useState("");

  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await api.get("/recipes");

        setRecipes(response.data);
      } catch (error) {
        console.error("Erro ao requisitar receitas:", error);
        toast.error("Erro ao requisitar as receitas, tente novamente mais tarde");

      }
    };
    fetchRecipes();
  }, []);
  //usei o useeffect, toda vez que searhSnetence muda, as receitas serão outras
  useEffect(() => {
    setFilteredRecipes(
      recipes.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(searchSentence.toLowerCase()) ||
          recipe.description
            .toLowerCase()
            .includes(searchSentence.toLowerCase()) ||
          recipe.category
            .toLowerCase()
            .includes(searchSentence.toLowerCase()) ||
          recipe.ingredients.some((ingredient) =>
            ingredient.value
              .toLowerCase()
              .includes(searchSentence.toLowerCase())
          )
      )
    );
  }, [searchSentence, recipes]);

  const handleOpenCreateModal = () => {
    setModalMode("create");
    setSelectedRecipe(undefined);
    setIsRecipeModalOpen(true);
  };
  const handleOpenEditModal = (recipe: Recipe) => {
    setModalMode("edit");
    setSelectedRecipe(recipe);
    setIsRecipeModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsRecipeModalOpen(false);
  };

  //omit vai OMITIR os campos que tu não quer
  const handleSaveRecipe = async (recipeData: Omit<Recipe, "id"> | Recipe) => {
    try {
      if (modalMode === "create") {
        const response = await api.post("/recipes", recipeData);
        const newRecipe = response.data;
        setRecipes((prev) => [...prev, newRecipe]);

        toast.success("Receita criada com sucesso!");
      } else {
        //edit
        const updatedRecipe = recipeData as Recipe;

        const response = await api.put(
          `/recipes/${updatedRecipe.id}`,
          updatedRecipe
        );
        setRecipes((prev) =>
          prev.map((recipe) =>
            recipe.id === updatedRecipe.id ? response.data : recipe
          )
        );
        toast.success("Receita editada com sucesso!");

      }
      handleCloseModal();
    } catch (error) {
      console.error(
        `Erro ao ${modalMode === "create" ? "criar" : "editar"} a receita `,
        error
      );
      toast.error(`Erro ao ${modalMode === "create" ? "criar" : "editar"} a receita `)
    }
  };

  const handleOpenDeleteConfirmationModal = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsDeleteConfirmationModalOpen(true);
  };

  const handleDeleteRecipe = async () => {
    try {
      if (selectedRecipe) {
        await api.delete(`/recipes/${selectedRecipe.id}`);
        setRecipes((prev) =>
          prev.filter((recipe) => recipe.id !== selectedRecipe.id)
        );
        setIsDeleteConfirmationModalOpen(false);
        setSelectedRecipe(undefined);
      }
      toast.success("Receita excluída com sucesso!");

    } catch (error) {
      console.error("Error a deletar receita", error);
      toast.error("Erro ao deletar receita");
    }
  };
  return (
    <main className="flex-grow py-8 px-2 md:px-0">
      <div className="container mx-auto flex gap-3 flex-col">
        <div className="flex justify-between w-full flex-col sm:flex-row">
          <h1 className="text-3xl font-bold">Todas as receitas</h1>
          <button
            onClick={handleOpenCreateModal}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white w-fit bg-black hover:bg-gray-800 transition-colors"
          >
            <Plus size={16} />
            Nova Receita
          </button>
        </div>
        <div className="flex-grow">
          <input
            type="text"
            placeholder="Pesquisar receitas por título, descrição, categoria ou ingredientes..."
            value={searchSentence}
            onChange={(e) => setSearchSentence(e.target.value)}
            className=" border-2 border-black focus:border-black text-black h-4 w-full p-4 rounded"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-8">
          {filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onEdit={() => handleOpenEditModal(recipe)}
              onDelete={() => handleOpenDeleteConfirmationModal(recipe)}
            />
          ))}
        </div>
      </div>
      <RecipeFormModal
        isOpen={isRecipeModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveRecipe}
        mode={modalMode}
        recipe={selectedRecipe}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteConfirmationModalOpen}
        onClose={() => setIsDeleteConfirmationModalOpen(false)}
        onConfirm={handleDeleteRecipe}
        recipe={selectedRecipe}
      />
    </main>
  );
}

import Link from "next/link";
import Image from "next/image";
import { Recipe } from "@/lib/data";
import { Edit, Trash2 } from "lucide-react";
interface RecipeCardProps {
  recipe: Recipe;
  onEdit?: () => void
  onDelete?: () => void
}
export function RecipeCard({ recipe, onEdit, onDelete }: RecipeCardProps) {
    const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault()
        onEdit?.()
    }
    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) =>{

      onDelete?.()
        e.preventDefault()
    }
  return (
    <Link href={`/receitas/${recipe.id}`} className="w-full sm:w-auto">
      {/* imagem */}
      <div className="flex flex-col border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow w-full">
        <div className="relative h-48 w-full">
          <Image src={recipe.image} alt={recipe.title} fill className="object-cover" />
        </div>

        <div className="flex flex-col justify-between p-4 gap-4 flex-grow">
          {/* titulo e descrição */}
          <div className="space-y-2">
            <h3 className="text-lg font-bold hover:text-orange-500 transition-colors">{recipe.title}</h3>
            <p>{recipe.description}</p>
          </div>
          {/* ações */}
          <div className="flex items-center justify-between w-full">
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {recipe.category}
            </span>

            <div className="flex items-center ${!onEdiit} ">
              {/* editar                 */}
              
              <button type="button" onClick={(e) => handleEdit(e)} className={`${!onEdit && 'hidden'} p-2 border border-gray-200 rounded hover:bg-gray-200 transition-colors`}>
                <Edit size={16} />
              </button>
              {/* remover                 */}
              <button type="button" onClick={(e) => handleDelete(e)} className={` ${!onDelete && 'hidden'} p-2 border border-gray-200 rounded hover:bg-gray-200 transition-colors`}>
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { RecipeFormData, recipeSchema } from "@/lib/formValidationSchemas/recipeSchema";
import { yupResolver } from "@hookform/resolvers/yup";
interface RecipeFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function RecipeFormModal({
  isOpen,
  onClose,
}: RecipeFormModalProps) {

  const {
    register,
    reset,
    handleSubmit,
    formState:{errors}
  } = useForm<RecipeFormData>({
    resolver:yupResolver(recipeSchema),
    mode: "onSubmit"
  })

  const onSubmit = (data:RecipeFormData) =>{
    console.log(data)
    reset()
    onClose()
  }

  const inputStyle = "p-2 border border-zinc-200 rounded-md"
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Nova receita</DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-2">
            {/* Título */}
            <div className="flex flex-col gap-1">
              <label htmlFor="title">Título</label>
              <input
                className={inputStyle}
                type="text"
                id="title"
                {...register("title")}
              />
              {errors.title && <span className="text-sm text-red-500">{errors.title.message}</span> }
            </div>
            {/* categoria */}
            <div className="flex flex-col gap-1">
              <label htmlFor="category">Categoria</label>
              <input
                className={inputStyle}
                type="text"
                {...register("category")}
                id="category"
              />
              {errors.category && <span className="text-sm text-red-500">{errors.category.message}</span> }
            </div>
            
          </div>
          {/* Descrição */}
          <div className="flex flex-col gap-1">
            <label htmlFor="description">Descrição</label>
            <textarea {...register("description")} id="description" className={inputStyle}></textarea>
            {errors.description && <span className="text-sm text-red-500">{errors.description.message}</span> }
          </div>


          {/* URL DA IMAGEM */}
          <div className="flex flex-col gap-1">
            <label htmlFor="imageUrl">URL da imagem</label>
            <input {...register("imageURL")} type="text" placeholder="/placeholder.svg" id="imageUrl" className={inputStyle}/>
            {errors.imageURL && <span className="text-sm text-red-500">{errors.imageURL.message}</span> }
          </div>


          <div className="grid grid-cols-3 gap-1">

             {/* Tempo de Preparo */}
             <div className="flex flex-col gap-1">
              <label htmlFor="prepTime">Tempo de preparo</label>
              <input
                className={inputStyle}
                type="text"
                {...register("prepTime")}
                id="prepTime"
                placeholder="15 minutos"
              />
              {errors.prepTime && <span className="text-sm text-red-500">{errors.prepTime.message}</span> }
            </div>
             {/* Cozimento  */}
             <div className="flex flex-col gap-1">
              <label htmlFor="cookTime">Tempo de cozimento</label>
              <input
                className={inputStyle}
                type="text"
                {...register("cookTime")}
                id="cookTime"
                placeholder="30 minutos"
              />
              {errors.cookTime && <span className="text-sm text-red-500">{errors.cookTime.message}</span> }
            </div>
             {/* Porções */}
             <div className="flex flex-col gap-1">
              <label htmlFor="servings">Porções</label>
              <input
                className={inputStyle}
                type="number"
                {...register("servings")}
                id="servings"
                defaultValue={1}
              />

            </div>
            {errors.servings && <span className="text-sm text-red-500">{errors.servings.message}</span> }
          </div>

          <div className="flex gap-2 self-end">
            <button type="button" onClick={onClose} className="bg-white border border-zinc-300 rounded-md hover:bg-gray-100 transition-colors px-4 py-2 font-medium">Cancelar</button>
            <button type="submit" className="bg-black rounded-md hover:bg-gray-800 transition-colors px-4 py-2 font-medium text-white">Criar Receita</button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

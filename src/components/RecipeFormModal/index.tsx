import { useFieldArray, useForm } from "react-hook-form";
import { Recipe } from "@/lib/data";
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
import {
  RecipeFormData,
  recipeSchema,
} from "@/lib/formValidationSchemas/recipeSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
interface RecipeFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (recipe: Omit<Recipe, "id"> | Recipe) => void;
  mode: "create" | "edit"
  recipe?: Recipe
}

const DEFAULT_VALUES: RecipeFormData = {
  title: "",
  category: "",
  description: "",
  image: "",
  prepTime: "",
  cookTime: "",
  servings: 1,
  ingredients: [{ value: "" }],
  instructions: [{ value: "" }],
};
export default function RecipeFormModal({
  isOpen,
  onClose,
  onSave,
  recipe,
  mode

}: RecipeFormModalProps) {

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<RecipeFormData>({
    resolver: yupResolver(recipeSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onSubmit",
  });

  const {
    fields: ingredientsFields,
    append: appendIngredients,
    remove: removeIngredients,
  } = useFieldArray({
    control,
    name: "ingredients",
  });

  const {
    fields: instructionFields,
    append: appendInstructions,
    remove: removeInstructions,
  } = useFieldArray({
    control,
    name: "instructions",
  });

  useEffect(() => {
    if(isOpen){
      if(mode === "edit" && recipe){
        reset({
          ...recipe, 
          ingredients: recipe.ingredients.map((ing)=> ({value:ing.value})),
          instructions: recipe.ingredients.map((inst)=> ({value:inst.value}))
        })
      }
    } else{
      reset(DEFAULT_VALUES)
    }
  },[mode,isOpen, recipe, reset])

  const onSubmit = (data: RecipeFormData) => {
    


    onSave(mode == "edit" && recipe ? {...data, id:recipe.id}:data)
    reset();
    onClose();
  };

  const inputStyle = "p-2 border border-zinc-200 rounded-md flex-grow w-full";
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
<DialogContent className="bg-white w-[95vw] max-w-3xl max-h-[90vh] text-base overflow-y-auto sm:rounded-lg sm:w-full">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Nova" : "Editar"} receita</DialogTitle>
        </DialogHeader>
        <form
          className="flex flex-col gap-4 w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {/* Título */}
            <div className="flex flex-col gap-1">
              <label htmlFor="title">Título</label>
              <input
                className={inputStyle}
                type="text"
                id="title"
                {...register("title")}
              />
              {errors.title && (
                <span className="text-sm text-red-500">
                  {errors.title.message}
                </span>
              )}
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
              {errors.category && (
                <span className="text-sm text-red-500">
                  {errors.category.message}
                </span>
              )}
            </div>
          </div>
          {/* Descrição */}
          <div className="flex flex-col gap-1">
            <label htmlFor="description">Descrição</label>
            <textarea
              {...register("description")}
              id="description"
              className={inputStyle}
            ></textarea>
            {errors.description && (
              <span className="text-sm text-red-500">
                {errors.description.message}
              </span>
            )}
          </div>

          {/* URL DA IMAGEM */}
          <div className="flex flex-col gap-1">
            <label htmlFor="image">URL da imagem</label>
            <input
              {...register("image")}
              type="text"
              placeholder="/placeholder.svg"
              id="image"
              className={inputStyle}
            />
            {errors.image && (
              <span className="text-sm text-red-500">
                {errors.image.message}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1">
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
              {errors.prepTime && (
                <span className="text-sm text-red-500">
                  {errors.prepTime.message}
                </span>
              )}
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
              {errors.cookTime && (
                <span className="text-sm text-red-500">
                  {errors.cookTime.message}
                </span>
              )}
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
            {errors.servings && (
              <span className="text-sm text-red-500">
                {errors.servings.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="ingredients">Ingredientes</label>
            <div className="flex flex-col gap-1">
              {/* content */}
              {ingredientsFields.map((field, index) => (
                <div key={field.id} className="flex flex-col sm:flex-row gap-2">
                  <div className="flex-grow">
                    <input
                      type="text"
                      id="ingredients"
                      className={inputStyle}
                      {...register(`ingredients.${index}.value`)}
                      placeholder="Digite um ingrediente"
                    />
                    {errors.ingredients?.[index]?.value && (
                      <span className="text-sm text-red-500">
                        {" "}
                        {errors.ingredients?.[index].value.message}
                      </span>
                    )}
                  </div>
                  {ingredientsFields.length > 1 && (
                    <button
                      type="button"
                      className="bg-white border border-zinc-300 rounded-md hover:bg-gray-100 transition-colors px-4 py-2 font-medium"
                      onClick={() => removeIngredients(index)}
                    >
                      Remover
                    </button>
                  )}
                </div>
              ))}
              <button
                className=" w-fit bg-white border border-zinc-300 rounded-md hover:bg-gray-100 transition-colors px-4 py-2 font-medium"
                onClick={() => appendIngredients({ value: "" })}
              >
                Adicionar Ingredientes
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="instructions">Instruções</label>
            <div className="flex flex-col gap-1">
              {/* conteúdo */}
              {instructionFields.map((field, index) => (
                <div key={field.id} className="flex flex-col sm:flex-row gap-2">
                  <div className="flex-grow">
                    <textarea
                      id="instructions"
                      className={inputStyle}
                      {...register(`instructions.${index}.value`)}
                      placeholder="Digite uma instrução"
                    />
                    {errors.instructions?.[index]?.value && (
                      <span className="text-sm text-red-500">
                        {" "}
                        {errors.instructions?.[index].value.message}
                      </span>
                    )}
                  </div>

                  {instructionFields.length > 1 && (
                    <button
                      type="button"
                      className="bg-white border border-zinc-300 rounded-md hover:bg-gray-100 transition-colors px-4 py-2 font-medium"
                      onClick={() => removeInstructions(index)}
                    >
                      Remover
                    </button>
                  )}
                </div>
              ))}
              <button
                className=" w-fit bg-white border border-zinc-300 rounded-md hover:bg-gray-100 transition-colors px-4 py-2 font-medium"
                onClick={() => appendInstructions({ value: "" })}
              >
                Adicionar Instruções
              </button>
            </div>
          </div>

          <div className="flex gap-2 self-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-white border border-zinc-300 rounded-md hover:bg-gray-100 transition-colors px-4 py-2 font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-black rounded-md hover:bg-gray-800 transition-colors px-4 py-2 font-medium text-white"
            >
              {mode === "create" ? "Criar receita" : "Salvar alterações"} 
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

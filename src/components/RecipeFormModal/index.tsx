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
interface RecipeFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function RecipeFormModal({
  isOpen,
  onClose,
}: RecipeFormModalProps) {
  const inputStyle = "p-2 border border-zinc-200 rounded-md"
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Nova receita</DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-4 w-full">
          <div className="grid grid-cols-2 gap-2">
            {/* Título */}
            <div className="flex flex-col gap-1">
              <label htmlFor="title">Título</label>
              <input
                className={inputStyle}
                type="text"
                name=""
                id="title"
              />
            </div>
            {/* categoria */}
            <div className="flex flex-col gap-1">
              <label htmlFor="category">Categoria</label>
              <input
                className={inputStyle}
                type="text"
                name=""
                id="category"
              />
            </div>
          </div>
          {/* Descrição */}
          <div className="flex flex-col gap-1">
            <label htmlFor="description">Descrição</label>
            <textarea name="" id="description" className={inputStyle}></textarea>
          </div>


          {/* URL DA IMAGEM */}
          <div className="flex flex-col gap-1">
            <label htmlFor="imageUrl">URL da imagem</label>
            <input name="" type="text" placeholder="/placeholder.svg" id="imageUrl" className={inputStyle}/>
          </div>


          <div className="grid grid-cols-3 gap-1">

             {/* Tempo de Preparo */}
             <div className="flex flex-col gap-1">
              <label htmlFor="prepTime">Tempo de preparo</label>
              <input
                className={inputStyle}
                type="text"
                name=""
                id="prepTime"
                placeholder="15 minutos"
              />
            </div>
             {/* Cozimento  */}
             <div className="flex flex-col gap-1">
              <label htmlFor="cookTime">Tempo de cozimento</label>
              <input
                className={inputStyle}
                type="text"
                name=""
                id="cookTime"
                placeholder="30 minutos"
              />
            </div>
             {/* Porções */}
             <div className="flex flex-col gap-1">
              <label htmlFor="servings">Porções</label>
              <input
                className={inputStyle}
                type="number"
                name=""
                id="servings"
                defaultValue={1}
              />
            </div>
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

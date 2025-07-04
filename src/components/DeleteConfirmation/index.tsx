import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Recipe } from "@/lib/data";
interface DeleteConfirmationModalProps{
    isOpen: boolean,
    onClose: () => void,
    onConfirm: () => void;
    recipe: Recipe | undefined

}
export default function DeleteConfirmationModal({isOpen, onClose, onConfirm, recipe} : DeleteConfirmationModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Confirmar exclusão
          </DialogTitle>
          <DialogDescription>
    {`Tem certeza que deseja excluir a receita  "${recipe?.title}" estão ação não pode ser desfeita.`}
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-2">

            <Button onClick={onClose} variant={"outline"}>Cancelar</Button>
            <Button onClick={onConfirm} variant={"destructive"}>Excluir</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

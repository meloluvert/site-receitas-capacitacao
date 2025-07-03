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
interface RecipeFormModalProps{
  isOpen:boolean
  onClose: () => void
}
export default function RecipeFormModal({isOpen, onClose}:RecipeFormModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
            <DialogTitle>Nova receita</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

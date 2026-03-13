import { Plus } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Field, FieldGroup } from "../../components/ui/field";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

export function CreateProjectForm() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button>
            <Plus /> Create Project
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Create Project</DialogTitle>

            <DialogDescription>
              Enter a title and description for your new project, then click
              create to get started.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Title</Label>
              <Input id="name-1" name="title" />
            </Field>
            <Field>
              <Label htmlFor="username-1">Description</Label>
              <Input id="username-1" name="description" />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

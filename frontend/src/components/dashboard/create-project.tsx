import { useState } from "react";
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
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useIsMobile } from "../../hooks/use-mobile";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodSchemas, type CreateProjectValues } from "../../lib/zod-tools";
import { createProject } from "../../services/project.service";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { refetchUser } from "../../reducers/user.reducer";

export function CreateProjectForm() {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateProjectValues>({
    resolver: zodResolver(ZodSchemas.CreateProject),
  });

  const createMutation = useMutation({
    mutationFn: async (data: CreateProjectValues) => await createProject(data),
    retry: false,
  });

  const onSubmit = (data: CreateProjectValues) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        reset();
        setOpen(false);
        refetchUser(dispatch);
      },
      onError: (error) => {
        console.error("Create project failed:", error);
      },
    });
  };

  const isPending = createMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus /> Create {!isMobile && "Project"}
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

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4 py-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="My awesome project"
                {...register("title")}
              />
              {errors.title && (
                <span className="text-red-500 text-xs">
                  {errors.title.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="What's this project about?"
                {...register("description")}
              />
              {errors.description && (
                <span className="text-red-500 text-xs">
                  {errors.description.message}
                </span>
              )}
            </div>
          </div>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline" onClick={() => reset()}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

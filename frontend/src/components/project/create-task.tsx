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
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodSchemas, type CreateTaskValues } from "../../lib/zod-tools";
import { createTask } from "../../services/project.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { refetchUser } from "../../reducers/user.reducer";
import type { ProjectType, UserType } from "../../lib/type";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useUser } from "../../providers/dashboard-provider";

export function CreateTaskForm({ project }: { project: ProjectType }) {
  const user = useUser();

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const members = project.members.filter((mem) => mem.inviteStatus);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<CreateTaskValues>({
    resolver: zodResolver(ZodSchemas.CreateTask),
  });

  const createMutation = useMutation({
    mutationFn: async ({
      user,
      data,
    }: {
      user: UserType;
      data: CreateTaskValues;
    }) => {
      const member = members.find((mem) => mem.member.id === data.member);
      const taskData = {
        title: data.title,
        description: data.description,
        assignee: member?.member || user,
      };
      await createTask(project.id, taskData);
    },
    retry: false,
  });

  const onSubmit = (data: CreateTaskValues) => {
    createMutation.mutate(
      { user, data },
      {
        onSuccess: () => {
          reset();
          setOpen(false);
          refetchUser(dispatch);
          queryClient.refetchQueries({ queryKey: ["Project"] });
          queryClient.refetchQueries({ queryKey: ["User"] });
        },
        onError: (error) => {
          console.error("Create project failed:", error);
        },
      },
    );
  };

  const isPending = createMutation.isPending;

  if (user.id !== project.creator.id) return null;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <Plus /> Create {project.tasks.length === 0 && "First"} Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
          <DialogDescription>
            Enter a title and description and assign the task to a team member,
            then click create to get started.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4 py-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="My awesome Task"
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
                placeholder="What's this task about?"
                {...register("description")}
              />
              {errors.description && (
                <span className="text-red-500 text-xs">
                  {errors.description.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="member">Assign Task to member</label>

            <Controller
              name="member"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a member" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Members</SelectLabel>
                      <SelectItem value={user.id}>You</SelectItem>
                      {members.map((mem) => (
                        <SelectItem value={mem.member.id} key={mem.member.id}>
                          {mem.member.username}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />

            {errors.member && (
              <span className="text-red-500 text-xs">
                {errors.member.message}
              </span>
            )}
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

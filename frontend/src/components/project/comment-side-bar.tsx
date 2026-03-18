import { useEffect, useRef, useState } from "react";
import { type ProjectType } from "../../lib/type";
import { UserAvatar } from "../ui/avatar";
import { Button } from "../ui/button";
import { createComment } from "../../services/project.service";
import { Plus } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "../../providers/dashboard-provider";

export function CommentsSidebar({ project }: { project: ProjectType }) {
  const user = useUser();
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const list = project.comments;
  const queryClient = useQueryClient();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [list]);

  const commentMutation = useMutation({
    mutationFn: async (input: string) =>
      await createComment(project.id, { message: input }),
  });

  async function post() {
    commentMutation.mutate(input, {
      onSuccess: () => {
        queryClient.refetchQueries({ queryKey: ["Project"] });
        setInput("");
      },
    });
  }
  const pending = commentMutation.isPending;

  return (
    <aside className="flex flex-col h-full border-l border-gray-200 lg:border-t-0 border-t">
      <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-gray-200">
        <h2 className="text-sm font-medium ">Comments</h2>
        <span className="text-xs  text-foreground rounded-full px-2 py-0.5 font-medium">
          {list.length}
        </span>
      </div>

      <div className="flex-1 overflow-y-scroll px-4 py-3 flex flex-col gap-3 min-h-0 max-h-80">
        {list.map((c, i) => {
          const isMe = c.creator.email === user.email;

          if (isMe) {
            return (
              <div
                key={i}
                className="flex self-end items-end gap-2 max-w-[75%]"
              >
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[11px] text-muted-foreground px-1">
                    {c.creator.username}
                  </span>
                  <div className="bg-primary text-primary-foreground px-3 py-2 rounded-2xl rounded-br-sm border border-primary/20 shadow-sm">
                    <p className="text-xs leading-relaxed wrap-break-word">
                      {c.message}
                    </p>
                  </div>
                </div>
                <UserAvatar username={c.creator.username} />
              </div>
            );
          }

          return (
            <div key={i} className="flex items-end gap-2 max-w-[75%]">
              <UserAvatar username={c.creator.username} />
              <div className="flex flex-col gap-1">
                <span className="text-[11px] text-muted-foreground px-1">
                  {c.creator.username}
                </span>
                <div className="bg-muted px-3 py-2 rounded-2xl rounded-bl-sm border border-border shadow-sm">
                  <p className="text-xs text-foreground leading-relaxed wrap-break-word">
                    {c.message}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <div className="px-4 py-3 border-t border-gray-200 flex flex-col gap-2">
        <Textarea
          rows={3}
          className="text-sm"
          placeholder="Leave a comment…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) post();
          }}
        />
        <Button
          onClick={post}
          className="self-end"
          size={"sm"}
          disabled={input.trim().length < 3 || pending}
        >
          <Plus />
          {pending ? "Posting..." : "Post"}
        </Button>
      </div>
    </aside>
  );
}

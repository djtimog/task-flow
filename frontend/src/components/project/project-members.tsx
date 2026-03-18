import { EmptyMembers } from "./empty-members";
import { UserAvatar } from "../../components/ui/avatar";
import { useEffect, useRef, useState } from "react";
import type { ProjectType, UserType } from "../../lib/type";
import { Button } from "../ui/button";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { getAllUsers } from "../../services/user.service";
import { Input } from "../ui/input";
import { inviteToProject } from "../../services/project.service";
import { useUser } from "../../providers/dashboard-provider";

export default function ProjectMembers({ project }: { project: ProjectType }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<UserType | null>(null);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const user = useUser();

  const usersQuery = useSuspenseQuery<UserType[]>({
    queryKey: ["Users"],
    queryFn: async () => {
      return await getAllUsers();
    },
  });

  const inviteMutation = useMutation({
    mutationFn: async (selected: UserType) => {
      await inviteToProject(project.id, {
        email: selected.email,
        username: selected.username,
      });
    },
  });

  const memberIds = new Set(project.members.map((m) => m.member.id));
  const filtered = usersQuery.data.filter(
    (u) =>
      !memberIds.has(u.id) &&
      project.creator.id != u.id &&
      u.verified &&
      (u.username.toLowerCase().includes(query.toLowerCase()) ||
        u.email.toLowerCase().includes(query.toLowerCase())),
  );

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleSelect(user: UserType) {
    setSelected(user);
    setQuery(user.username);
    setOpen(false);
  }

  async function handleInvite() {
    if (!selected) return;
    inviteMutation.mutate(selected, {
      onSuccess: () => {
        queryClient.refetchQueries({ queryKey: ["Project"] });
        setSelected(null);
        setQuery("");
      },
    });
  }

  const members: {
    member: UserType;
    inviteStatus: boolean;
  }[] = [...project.members, { member: project.creator, inviteStatus: true }];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium text-muted-foreground">
          Team members
        </h2>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex gap-2 items-stretch" ref={wrapRef}>
          <div className="relative flex-1">
            <svg
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <Input
              className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 placeholder-gray-400"
              placeholder="Search users to invite…"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpen(true);
                setSelected(null);
              }}
              onFocus={() => {
                if (query) setOpen(true);
              }}
            />

            {open && query && filtered.length > 0 && (
              <div className="absolute bg-background top-full mt-1 left-0 right-0 border border-gray-200 rounded-lg z-20 overflow-hidden shadow-sm">
                {filtered.map((u) => (
                  <Button
                    key={u.id}
                    variant={"ghost"}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 text-left transition-colors"
                    onMouseDown={() => handleSelect(u)}
                  >
                    <UserAvatar username={u.username} size="sm" />

                    <div>
                      <p className="text-sm font-medium leading-tight">
                        @{u.username}
                      </p>
                    </div>
                  </Button>
                ))}
              </div>
            )}
            {open && query && filtered.length === 0 && (
              <div className="absolute bg-background top-full mt-1 left-0 right-0 border border-gray-200 rounded-lg z-20 px-3 py-3 text-sm text-muted-foreground shadow-sm">
                No users found
              </div>
            )}
          </div>
          <Button
            onClick={handleInvite}
            disabled={!selected || inviteMutation.isPending}
            size={"lg"}
          >
            {inviteMutation.isPending ? "Inviting..." : "Invite"}
          </Button>
        </div>

        {project.members.length === 0 ? (
          <EmptyMembers />
        ) : (
          <div className="flex flex-col gap-2">
            {members.map(
              ({
                member,
                inviteStatus,
              }: {
                member: UserType;
                inviteStatus: boolean;
              }) => (
                <div
                  key={member.id}
                  className="flex items-center gap-3 px-3 py-2.5 border border-gray-100 rounded-lg"
                >
                  <UserAvatar username={member.username} />

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {member.email === user.email ? "You" : member.username}
                    </p>
                    {inviteStatus && (
                      <p className="text-xs text-gray-500 truncate">
                        {member.email}
                      </p>
                    )}
                  </div>
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                      inviteStatus
                        ? "bg-green-100 text-green-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {inviteStatus ? "Joined" : "Pending"}
                  </span>
                </div>
              ),
            )}
          </div>
        )}
      </div>
    </div>
  );
}

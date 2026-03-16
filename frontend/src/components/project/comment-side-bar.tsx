import type { ProjectType } from "../../lib/type";
import { Avatar, AvatarFallback } from "../ui/avatar";


export function CommentsSidebar({ projects }: { projects: ProjectType }) {
  const [list, setList] = useState<>(comments);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [list]);

  function post() {
    const msg = input.trim();
    if (!msg) return;
    setList((prev) => [
      ...prev,
      {
        message: msg,
        creator: MOCK_ALL_USERS[3],
        project: PLACEHOLDER_PROJECT,
        time: "Just now",
      },
    ]);
    setInput("");
  }

  return (
    <aside className="flex flex-col h-full bg-gray-50 border-l border-gray-200 lg:border-t-0 border-t">
      <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-gray-200">
        <h2 className="text-sm font-medium text-gray-900">Comments</h2>
        <span className="text-xs bg-gray-200 text-gray-600 rounded-full px-2 py-0.5 font-medium">
          {list.length}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-4 min-h-0">
        {list.map((c, i) => (
          <div key={i} className="flex gap-2.5">
            <Avatar size="sm">
              <AvatarFallback>{} </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2">
                <span className="text-xs font-medium text-gray-900">
                  {c.creator.username}
                </span>
                <span className="text-[11px] text-gray-400">{c.time}</span>
              </div>
              <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                {c.message}
              </p>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="px-4 py-3 border-t border-gray-200 flex flex-col gap-2">
        <textarea
          rows={3}
          className="w-full text-sm px-3 py-2 border border-gray-200 rounded-lg bg-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 placeholder-gray-400"
          placeholder="Leave a comment…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) post();
          }}
        />
        <button
          onClick={post}
          className="self-end px-4 py-1.5 text-sm font-medium rounded-lg bg-gray-900 text-white hover:bg-gray-700 transition-colors"
        >
          Post
        </button>
      </div>
    </aside>
  );
}

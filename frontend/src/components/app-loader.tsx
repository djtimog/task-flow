export default function AppLoader() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background">
      <div className="flex flex-col items-center gap-3">
        <img src="/logo.png" alt="Logo" className="h-10 animate-pulse" />
        <h1 className="text-xl font-bold tracking-tight">TaskFlow</h1>
      </div>
      <div className="flex items-center gap-1.5">
        {Array(3).map((i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full bg-primary animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}

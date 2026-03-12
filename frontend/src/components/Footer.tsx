function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-5xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="h-6" />
          <span className="font-semibold">TaskFlow</span>
        </div>

        <span className="text-center">
          © 2026 TaskFlow. All rights reserved.
        </span>

        <div className="flex gap-4">
          <a href="#" className="hover:text-foreground transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

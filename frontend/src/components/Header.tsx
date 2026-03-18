import { useState } from "react";
import { Button } from "./ui/button";
import { ModeToggle } from "./ui/mode-toggle";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { route } from "../lib/routes";
import { useAppSelector } from "../hooks/use-app-selector";
import { UserDropdown } from "./userDropdown";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useAppSelector((root) => root.user);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="h-8" />
          <span className="font-bold text-lg">TaskFlow</span>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <ModeToggle />
          {user ? (
            <UserDropdown avatarName={user.username} />
          ) : (
            <>
              <Link to={route.auth.login}>
                <Button variant="outline">Log in</Button>
              </Link>
              <Link to={route.auth.signup}>
                <Button>Sign up</Button>
              </Link>
            </>
          )}
        </div>

        <div className="flex sm:hidden items-center gap-2">
          <ModeToggle />
          {user ? (
            <UserDropdown avatarName={user.username} />
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          )}
        </div>
      </div>

      {menuOpen && !user && (
        <div className="sm:hidden border-t border-border bg-background px-6 py-4 flex flex-col gap-2">
          <>
            <Link to={route.auth.login}>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setMenuOpen(false)}
              >
                Log in
              </Button>
            </Link>
            <Link to={route.auth.signup}>
              <Button className="w-full" onClick={() => setMenuOpen(false)}>
                Sign up
              </Button>
            </Link>
          </>
        </div>
      )}
    </header>
  );
}

export default Header;

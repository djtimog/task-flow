import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Search, Trash2, ChevronRight } from "lucide-react";
import ProfileSettings from "../../components/settings/profile";
import LargeModeToggle from "../../components/settings/large-mode-toggle";
import ChangePasswordForm from "../../components/settings/change-password";
import { SETTINGS } from "../../lib/setting";

export default function SettingsPage() {
  const [active, setActive] = useState(SETTINGS[0].id);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return SETTINGS;
    const q = search.toLowerCase();
    return SETTINGS.filter(
      (s) =>
        s.label.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.keywords.some((k) => k.includes(q)),
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-muted/30 p-4 md:p-8">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Manage your account preferences
            </p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search settings..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <aside className="w-full md:w-56 shrink-0">
            <Card className="p-2">
              <nav className="flex flex-col gap-1">
                {filtered.length === 0 && (
                  <p className="text-xs text-muted-foreground px-3 py-2">
                    No results for "{search}"
                  </p>
                )}
                {filtered.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => {
                      setActive(id);
                      setSearch("");
                    }}
                    className={`flex items-center justify-between gap-2.5 px-3 py-2 rounded-md text-sm font-medium transition-colors w-full text-left
                      ${
                        active === id && !search
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 shrink-0" />
                      {label}
                    </span>
                    <ChevronRight className="w-3 h-3 opacity-50" />
                  </button>
                ))}
              </nav>
            </Card>
          </aside>

          <main className="flex-1 flex flex-col gap-4">
            {active === "profile" && <ProfileSettings />}

            {active === "appearance" && <LargeModeToggle />}

            {active === "password" && <ChangePasswordForm />}

            {active === "danger" && (
              <Card className="border-destructive/40">
                <CardHeader>
                  <CardTitle className="text-base text-destructive flex items-center gap-2">
                    <Trash2 className="w-4 h-4" /> Danger Zone
                  </CardTitle>
                  <CardDescription>
                    These actions are irreversible
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-3 rounded-lg border border-destructive/20 bg-destructive/5">
                    <div>
                      <p className="text-sm font-medium">Delete account</p>
                      <p className="text-xs text-muted-foreground">
                        Permanently delete your account and all data
                      </p>
                    </div>
                    <Button variant="destructive" size="sm" disabled>
                      <Trash2 className="w-4 h-4 mr-1.5" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

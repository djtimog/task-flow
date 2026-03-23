import { ArrowRight } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { route } from "../lib/routes";
import { useTheme } from "../components/theme-provider";

export default function HomePage() {
  const { theme } = useTheme();

  const resolvedTheme =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-6 pt-40 pb-24 flex flex-col items-center text-center gap-6">
        <Badge>Task management, simplified</Badge>

        <h1 className="text-5xl font-bold tracking-tight leading-tight max-w-2xl">
          Everything your team needs to get work done
        </h1>

        <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
          TaskFlow helps your team organize tasks, track progress, and ship
          faster all in one clean, focused workspace.
        </p>

        <div className="flex items-center gap-3 mt-2">
          <Link to={route.dashboard.index}>
            <Button>
              Get started free <ArrowRight size={16} />
            </Button>
          </Link>
          <Button variant={"outline"}>Learn more</Button>
        </div>

        <div className="mt-10 w-full max-w-3xl rounded-xl border border-border overflow-hidden">
          <img
            src={
              resolvedTheme === "dark" ? "/dark-hero.png" : "/light-hero.png"
            }
            alt="Picture of the Dashboard"
            className="w-full"
          />
        </div>
      </main>
      <Footer />
    </>
  );
}

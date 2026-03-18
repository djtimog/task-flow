import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Monitor, Moon, Palette, Sun } from "lucide-react";
import { Label } from "../ui/label";
import { useTheme } from "../theme-provider";

function LargeModeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Palette className="w-4 h-4" /> Appearance
        </CardTitle>
        <CardDescription>Customize how TaskFlow looks for you</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <Label>Theme</Label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: "light", label: "Light", icon: Sun },
              { value: "dark", label: "Dark", icon: Moon },
              { value: "system", label: "System", icon: Monitor },
            ].map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                onClick={() => setTheme(value as "light" | "dark" | "system")}
                className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all text-sm font-medium
                            ${
                              theme === value
                                ? "border-primary bg-primary/5 text-primary"
                                : "border-border text-muted-foreground hover:border-muted-foreground"
                            }`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default LargeModeToggle;

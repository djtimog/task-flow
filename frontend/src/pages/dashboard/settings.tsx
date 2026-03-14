import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import { Switch } from "../../components/ui/switch";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Separator } from "../../components/ui/separator";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Trash2,
  LogOut,
  Moon,
  Sun,
  Monitor,
} from "lucide-react";

type Section =
  | "profile"
  | "appearance"
  | "notifications"
  | "privacy"
  | "account";

const NAV: { id: Section; label: string; icon: React.ReactNode }[] = [
  { id: "profile", label: "Profile", icon: <User className="w-4 h-4" /> },
  {
    id: "appearance",
    label: "Appearance",
    icon: <Palette className="w-4 h-4" />,
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: <Bell className="w-4 h-4" />,
  },
  { id: "privacy", label: "Privacy", icon: <Shield className="w-4 h-4" /> },
  { id: "account", label: "Account", icon: <Globe className="w-4 h-4" /> },
];

export default function SettingsPage() {
  const [active, setActive] = useState<Section>("profile");
  const [theme, setTheme] = useState("system");
  const [notifications, setNotifications] = useState({
    taskAssigned: true,
    projectUpdates: true,
    mentions: true,
    emailDigest: false,
    desktopPush: false,
  });
  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showEmail: false,
    showProjects: true,
  });

  return (
    <div className="min-h-screen bg-muted/30 p-4 md:p-8">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your account preferences
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Nav */}
          <aside className="w-full md:w-52 shrink-0">
            <Card className="p-2">
              <nav className="flex flex-col gap-1">
                {NAV.map(({ id, label, icon }) => (
                  <button
                    key={id}
                    onClick={() => setActive(id)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium transition-colors w-full text-left
                      ${
                        active === id
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                  >
                    {icon}
                    {label}
                  </button>
                ))}
              </nav>
            </Card>
          </aside>

          {/* Content */}
          <main className="flex-1 flex flex-col gap-4">
            {/* ── PROFILE ── */}
            {active === "profile" && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      Profile Information
                    </CardTitle>
                    <CardDescription>
                      Update your public profile details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-5">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src="" />
                        <AvatarFallback className="text-lg">DT</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col gap-1">
                        <Button variant="outline" size="sm">
                          Change avatar
                        </Button>
                        <span className="text-xs text-muted-foreground">
                          JPG, PNG up to 2MB
                        </span>
                      </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <Label>Username</Label>
                        <Input defaultValue="djtimog" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <Label>Email</Label>
                        <div className="relative">
                          <Input defaultValue="ogunleyetimilehin15@gmail.com" />
                          <Badge
                            variant="secondary"
                            className="absolute right-2 top-1.5 text-xs"
                          >
                            Verified
                          </Badge>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1.5 sm:col-span-2">
                        <Label>Bio</Label>
                        <Input placeholder="Tell your team about yourself..." />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button>Save changes</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Change Password</CardTitle>
                    <CardDescription>
                      Use a strong password you don't use elsewhere
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <Label>Current password</Label>
                      <Input type="password" placeholder="••••••••" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label>New password</Label>
                      <Input type="password" placeholder="••••••••" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label>Confirm new password</Label>
                      <Input type="password" placeholder="••••••••" />
                    </div>
                    <div className="flex justify-end">
                      <Button variant="outline">Update password</Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {/* ── APPEARANCE ── */}
            {active === "appearance" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Appearance</CardTitle>
                  <CardDescription>
                    Customize how TaskFlow looks for you
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-6">
                  <div className="flex flex-col gap-3">
                    <Label>Theme</Label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        {
                          value: "light",
                          label: "Light",
                          icon: <Sun className="w-5 h-5" />,
                        },
                        {
                          value: "dark",
                          label: "Dark",
                          icon: <Moon className="w-5 h-5" />,
                        },
                        {
                          value: "system",
                          label: "System",
                          icon: <Monitor className="w-5 h-5" />,
                        },
                      ].map(({ value, label, icon }) => (
                        <button
                          key={value}
                          onClick={() => setTheme(value)}
                          className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all text-sm font-medium
                            ${
                              theme === value
                                ? "border-primary bg-primary/5 text-primary"
                                : "border-border text-muted-foreground hover:border-muted-foreground"
                            }`}
                        >
                          {icon}
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="flex flex-col gap-3">
                    <Label>Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger className="w-full sm:w-56">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="flex flex-col gap-3">
                    <Label>Density</Label>
                    <Select defaultValue="comfortable">
                      <SelectTrigger className="w-full sm:w-56">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="compact">Compact</SelectItem>
                        <SelectItem value="comfortable">Comfortable</SelectItem>
                        <SelectItem value="spacious">Spacious</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* ── NOTIFICATIONS ── */}
            {active === "notifications" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Notifications</CardTitle>
                  <CardDescription>
                    Choose what you want to be notified about
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col divide-y">
                  {[
                    {
                      key: "taskAssigned",
                      label: "Task assigned to you",
                      desc: "When someone assigns you a task",
                    },
                    {
                      key: "projectUpdates",
                      label: "Project updates",
                      desc: "Activity in projects you're part of",
                    },
                    {
                      key: "mentions",
                      label: "Mentions",
                      desc: "When someone mentions you",
                    },
                    {
                      key: "emailDigest",
                      label: "Email digest",
                      desc: "Weekly summary sent to your email",
                    },
                    {
                      key: "desktopPush",
                      label: "Desktop push",
                      desc: "Browser push notifications",
                    },
                  ].map(({ key, label, desc }) => (
                    <div
                      key={key}
                      className="flex items-center justify-between py-4"
                    >
                      <div>
                        <p className="text-sm font-medium">{label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {desc}
                        </p>
                      </div>
                      <Switch
                        checked={
                          notifications[key as keyof typeof notifications]
                        }
                        onCheckedChange={(val) =>
                          setNotifications((prev) => ({ ...prev, [key]: val }))
                        }
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* ── PRIVACY ── */}
            {active === "privacy" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Privacy</CardTitle>
                  <CardDescription>
                    Control your visibility to other users
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col divide-y">
                  {[
                    {
                      key: "profileVisible",
                      label: "Public profile",
                      desc: "Allow others to view your profile",
                    },
                    {
                      key: "showEmail",
                      label: "Show email",
                      desc: "Display your email on your profile",
                    },
                    {
                      key: "showProjects",
                      label: "Show projects",
                      desc: "Let others see your project list",
                    },
                  ].map(({ key, label, desc }) => (
                    <div
                      key={key}
                      className="flex items-center justify-between py-4"
                    >
                      <div>
                        <p className="text-sm font-medium">{label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {desc}
                        </p>
                      </div>
                      <Switch
                        checked={privacy[key as keyof typeof privacy]}
                        onCheckedChange={(val) =>
                          setPrivacy((prev) => ({ ...prev, [key]: val }))
                        }
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* ── ACCOUNT ── */}
            {active === "account" && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Sessions</CardTitle>
                    <CardDescription>
                      Manage where you're logged in
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-3">
                    {[
                      {
                        device: "Chrome on macOS",
                        location: "Lagos, NG",
                        current: true,
                      },
                      {
                        device: "Firefox on Windows",
                        location: "Abuja, NG",
                        current: false,
                      },
                    ].map(({ device, location, current }) => (
                      <div
                        key={device}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                      >
                        <div>
                          <p className="text-sm font-medium flex items-center gap-2">
                            {device}
                            {current && (
                              <Badge variant="secondary" className="text-xs">
                                Current
                              </Badge>
                            )}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {location}
                          </p>
                        </div>
                        {!current && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                          >
                            <LogOut className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-destructive/40">
                  <CardHeader>
                    <CardTitle className="text-base text-destructive">
                      Danger Zone
                    </CardTitle>
                    <CardDescription>
                      These actions are irreversible
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-3">
                    <div className="flex items-center justify-between p-3 rounded-lg border border-destructive/20 bg-destructive/5">
                      <div>
                        <p className="text-sm font-medium">Delete account</p>
                        <p className="text-xs text-muted-foreground">
                          Permanently delete your account and all data
                        </p>
                      </div>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="w-4 h-4 mr-1.5" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

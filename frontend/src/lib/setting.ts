import { User, Palette, Trash2, KeyRound } from "lucide-react";

export const SETTINGS = [
  {
    id: "profile",
    label: "Profile",
    description: "Update your username, email and bio",
    icon: User,
    keywords: ["username", "email", "bio", "avatar", "name", "profile"],
  },
  {
    id: "appearance",
    label: "Appearance",
    description: "Theme, language and display density",
    icon: Palette,
    keywords: [
      "theme",
      "dark",
      "light",
      "language",
      "density",
      "appearance",
      "color",
    ],
  },
  {
    id: "password",
    label: "Change Password",
    description: "Update your account password",
    icon: KeyRound,
    keywords: ["password", "security", "change password", "credentials"],
  },
  {
    id: "danger",
    label: "Delete Account",
    description: "Permanently delete your account and data",
    icon: Trash2,
    keywords: ["delete", "remove", "danger", "account", "deactivate"],
  },
];

"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useState } from "react";
import { updateProfile } from "../../services/user.service";
import { useDispatch } from "react-redux";
import { setUser } from "../../reducers/user.reducer";
import { useUser } from "../../providers/dashboard-provider";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { User } from "lucide-react";

function ProfileSettings() {
  const user = useUser();

  const dispatch = useDispatch();
  const [username, setUsername] = useState<string>(user?.username || "");

  const handleUserChange = async () => {
    const updatedUser = await updateProfile(user.id, { username });
    dispatch(setUser(updatedUser));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <User className="w-4 h-4" /> Profile Information
        </CardTitle>
        <CardDescription>Update your public profile details</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
            {user.username[0].toUpperCase()}
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <Label>Username</Label>
            <Input
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Email</Label>
            <div className="relative">
              <Input defaultValue={user.email} disabled />
              {user?.verified && (
                <Badge
                  variant="secondary"
                  className="absolute right-2 top-1.5 text-xs"
                >
                  Verified
                </Badge>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            disabled={user.username === username}
            onClick={handleUserChange}
          >
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProfileSettings;

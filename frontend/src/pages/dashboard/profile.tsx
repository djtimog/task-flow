"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useAppSelector } from "../../hooks/use-app-selector";
import { useState } from "react";

function Profile() {
  const user = useAppSelector((root) => root.user);
  const [username, setUsername] = useState<string>(user?.username || "");
  if (!user) return null;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-muted-foreground">Manage your account settings</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>User</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/avatar.png" />
              <AvatarFallback>{user.username.slice(0, 2)}</AvatarFallback>
            </Avatar>

            <div className="text-center">
              <p className="font-semibold">{user.username}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              {/* <p className="text-sm">{user.role}</p> */}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label>User Name</Label>
                <Input
                  value={username}
                  onChange={({ target }) => setUsername(target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Email</Label>
                <Input defaultValue={user.email} disabled />
              </div>
            </div>

            {/* <div className="space-y-2">
              <Label>Role</Label>
              <Input defaultValue={user.role} />
            </div> */}

            <Button disabled={user.username === username}>Save Changes</Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Projects
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-bold">{user.projects}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Tasks Completed
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-bold">{user.assignedTasks}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Profile;

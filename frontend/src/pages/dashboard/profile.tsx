"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { UserAvatar } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useState } from "react";
import { updateProfile } from "../../services/user.service";
import { useDispatch } from "react-redux";
import { setUser } from "../../reducers/user.reducer";
import { useUser } from "../../providers/dashboard-provider";

function Profile() {
  const user = useUser();

  const dispatch = useDispatch();
  const [username, setUsername] = useState<string>(user?.username || "");

  const handleUserChange = async () => {
    const updatedUser = await updateProfile(user.id, { username });
    dispatch(setUser(updatedUser));
  };
  const completedTasks = user.assignedTasks.filter(
    (tasks) => tasks.isDone === true,
  );
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
            <UserAvatar className="h-20 w-20" username={user.username} />

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

            <Button
              disabled={user.username === username}
              onClick={handleUserChange}
            >
              Save Changes
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Projects
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-bold">{user.projects.length || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Participating Projects
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-bold">
              {user.participatingProjects.length || 0}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Tasks Completed
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-bold">{completedTasks.length || 0}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Profile;

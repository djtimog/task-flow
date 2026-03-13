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

function Profile() {
  const user = {
    name: "Timog",
    email: "timog@email.com",
    role: "Frontend Developer",
    projects: 8,
    tasks: 42,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-muted-foreground">Manage your account settings</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle>User</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/avatar.png" />
              <AvatarFallback>TF</AvatarFallback>
            </Avatar>

            <div className="text-center">
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <p className="text-sm">{user.role}</p>
            </div>

            <Button variant="outline" className="w-full">
              Change Avatar
            </Button>
          </CardContent>
        </Card>

        {/* Edit Profile Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input defaultValue={user.name} />
              </div>

              <div className="space-y-2">
                <Label>Email</Label>
                <Input defaultValue={user.email} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Role</Label>
              <Input defaultValue={user.role} />
            </div>

            <Button>Save Changes</Button>
          </CardContent>
        </Card>
      </div>

      {/* Stats Section */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
            <p className="text-2xl font-bold">{user.tasks}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Team Role
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-lg font-semibold">{user.role}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Profile;

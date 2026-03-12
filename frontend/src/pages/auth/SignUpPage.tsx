import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { route } from "../../lib/routes";

function SignUpPage() {
  return (
    <div className="flex-1 flex items-center justify-center px-4">
      <div className="w-full max-w-sm flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <img src="/logo.png" alt="Logo" className="h-10" />
          <h1 className="text-2xl font-bold">TaskFlow</h1>
          <p className="text-muted-foreground text-sm">Create your account</p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input id="name" type="text" placeholder="John Doe" />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="confirm">Confirm Password</Label>
            <Input id="confirm" type="password" placeholder="••••••••" />
          </div>

          <Button className="w-full mt-1">Register</Button>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?
          <Link to={route.auth.login}>
            <Button variant={"link"}>Login</Button>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUpPage;

import { LogOutIcon } from "lucide-react";
import { Button } from "../ui/button";
import { logOutUser } from "../../services/auth.service";
import { useDispatch } from "react-redux";
import { removeUser } from "../../reducers/user.reducer";
import { toast } from "sonner";

export function LogOutButton({ icon }: { icon?: boolean }) {
  const dispatch = useDispatch();
  const logout = async () => {
    try {
      await logOutUser();
      removeUser(dispatch);
    } catch (error) {
      console.log(error);
      toast.error("Couldn't log out, try again later");
    }
  };

  return (
    <Button variant="outline" className="w-full border-0" onClick={logout}>
      {icon && <LogOutIcon />}
      Log out
    </Button>
  );
}

import { LogOutIcon } from "lucide-react";
import { Button } from "../ui/button";
import { logoutUser } from "../../services/auth.service";
import { useDispatch } from "react-redux";
import { removeUser } from "../../reducers/user.reducer";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { route } from "../../lib/routes";

export function LogOutButton({ icon }: { icon?: boolean }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = async () => {
    try {
      await logoutUser();
      removeUser(dispatch);
      navigate(route.index);
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

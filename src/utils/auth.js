import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { resetPremiumState } from "../redux/slices/premiumSlice";
import { logoutUser } from "./storage";

export const useLogout = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logoutUser();

      dispatch(logout());
      dispatch(resetPremiumState());

      console.log("User logged out successfully");
      return true;
    } catch (error) {
      console.error("Error during logout:", error);
      return false;
    }
  };

  return handleLogout;
};

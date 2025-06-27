import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { resetPremiumState } from "../redux/slices/premiumSlice";
import { logoutUser } from "../utils/storage";

export const useLogout = () => {
  const dispatch = useDispatch();
  return async () => {
    try {
      await logoutUser();
      dispatch(logout());
      dispatch(resetPremiumState());
      return true;
    } catch {
      return false;
    }
  };
};

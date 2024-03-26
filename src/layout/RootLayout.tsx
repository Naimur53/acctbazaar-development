import { authKey } from "@/constants/storageKey";
import {
  loginUserWithToken,
  setLoading,
} from "@/redux/features/auth/authSlice";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch } from "@/redux/hook";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/local-storage";
import React, { useEffect } from "react";

type Props = { children: React.ReactNode };

const RootLayout: React.FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = getFromLocalStorage(authKey);
    if (token?.length && token !== "undefined") {
      // lsdafds

      dispatch(loginUserWithToken());
      //
    } else {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  return <>{children}</>;
};
export default RootLayout;

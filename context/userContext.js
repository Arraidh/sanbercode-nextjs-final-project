import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export const UserContext = createContext({});

export function UserContextProvider({ children, ...props }) {
  const router = useRouter();
  const [userData, setUserData] = useState();

  useEffect(() => {
    axios
      .get("https://service.pace-unv.cloud/api/user/me", {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      })
      .then((res) => {
        setUserData(res?.data);
      })
      .catch((err) => {
        setUserData(err?.response?.data);
        Cookies.remove("token");
      });
  }, []);

  const login = (response) => {
    const token = response?.data?.data?.token;
    const tokenExpiration = response?.data?.data?.expires_at;

    setUserData(response?.data);
    Cookies.set("token", token, {
      expires: new Date(tokenExpiration),
      path: "/",
    });

    setTimeout(() => {
      router.push("/");
    }, "2000");
  };

  const logout = () => {
    toast.promise(
      axios
        .post(
          "https://service.pace-unv.cloud/api/logout",
          {},
          {
            headers: { Authorization: `Bearer ${Cookies.get("token")}` },
          }
        )
        .then((res) => {
          setUserData(res?.data?.data);
          Cookies.remove("token");
          setTimeout(() => {
            router.push("/");
          }, "2000");
        })
        .catch((err) => {
          Cookies.remove("token");
          setTimeout(() => {
            router.push("/");
          }, "2000");
          console.log(err);
          setUserData(err?.response?.data);
          throw new Error(err);
        }),
      {
        loading: "Loading",
        success: "Logout Success",
        error: "Opps, Error occured",
      }
    );
  };

  return (
    <>
      <Toaster />
      <UserContext.Provider value={{ userData, logout, login }} {...props}>
        {children}
      </UserContext.Provider>
    </>
  );
}

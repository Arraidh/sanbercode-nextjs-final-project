import { UserContext } from "@/context/userContext";
import {
  Button,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Skeleton,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect } from "react";
import Icon from "@/public/icon.svg";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();
  const { userData, logout, isLoading } = useContext(UserContext);

  // useEffect(() => {
  //   console.log(userData);
  // }, []);

  return (
    <>
      {" "}
      <header className="z-50 shadow-lg bg-white top-0 fixed m-4 px-6 py-2 container rounded-xl flex flex-row justify-between items-center">
        <Link href={"/"} className="flex gap-2 items-center">
          <Image
            src={Icon}
            width={"300"}
            height={"200"}
            className="size-12"
            alt="icon"
          />
          <Heading size={"md"} className="text-rose-900">
            Connectify
          </Heading>
        </Link>
        <div className="flex items-center gap-2">
          {userData?.success ? (
            <>
              {isLoading ? (
                <>
                  <Button disabled={true}>
                    <Skeleton height="8px" width={"48px"} />
                  </Button>
                </>
              ) : (
                <>
                  <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                      {userData?.data?.name[0]}
                    </MenuButton>
                    <MenuList>
                      <MenuItem
                        onClick={() => {
                          router.push("/profile");
                        }}
                      >
                        Profile
                      </MenuItem>
                      <MenuItem isFocusable={true}>
                        {" "}
                        <Button
                          colorScheme="red"
                          className="!bg-rose-900 w-full"
                          size={"sm"}
                          onClick={logout}
                        >
                          Logout
                        </Button>
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </>
              )}
            </>
          ) : (
            <>
              <Link href={"/login"}>
                <Button
                  colorScheme={"red"}
                  className="!bg-rose-900"
                  size={"sm"}
                >
                  Login
                </Button>
              </Link>
              <Link href={"/register"}>
                <Button
                  colorScheme={"red"}
                  className="!bg-rose-50 !text-rose-900"
                  variant={"ghost"}
                  size={"sm"}
                >
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>
      </header>
    </>
  );
}

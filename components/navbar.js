import { Button, Heading } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <>
      {" "}
      <header className="shadow-lg bg-white top-0 fixed m-4 px-6 py-2 container  rounded-xl flex flex-row justify-between items-center">
        <div className="flex gap-2 items-center">
          <Image
            src={"/icon.svg"}
            width={"300"}
            height={"200"}
            className="size-12"
          />
          <Heading size={"md"} className="text-rose-900">
            Connectify
          </Heading>
        </div>
        <div className="flex items-center gap-2">
          <Link href={"/login"}>
            <Button colorScheme={"red"} className="!bg-rose-900" size={"sm"}>
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
        </div>
      </header>
    </>
  );
}

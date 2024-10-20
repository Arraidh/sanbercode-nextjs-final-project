import { UserContext } from "@/context/userContext";
import Layout from "@/layout";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const { login } = useContext(UserContext);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    toast.promise(
      axios
        .post("https://service.pace-unv.cloud/api/login", data)
        .then((res) => {
          login(res);
        })
        .catch((err) => {
          throw new Error(err?.response?.data?.message);
        }),
      {
        loading: "Loading",
        success: "Loading Success",
        error: (error) => error.toString(),
      }
    );
  };

  return (
    <>
      <Toaster />
      <Layout>
        <Card className="w-full max-w-md">
          <CardHeader>
            <Heading size={"lg"} className="text-rose-900">
              Login
            </Heading>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack gap={"8"}>
                <FormControl isInvalid={false}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    placeholder={"Email"}
                    onChange={() => {}}
                    {...register("email")}
                  />
                  {!false ? (
                    <FormHelperText>Enter your account email</FormHelperText>
                  ) : (
                    <FormErrorMessage>Email is required.</FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={false}>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="Password"
                    onChange={() => {}}
                    {...register("password")}
                  />
                  {!false ? (
                    <FormHelperText>Enter your account password</FormHelperText>
                  ) : (
                    <FormErrorMessage>Email is required.</FormErrorMessage>
                  )}
                </FormControl>
                <Button
                  type="submit"
                  colorScheme={"red"}
                  className="!bg-rose-900"
                >
                  Login
                </Button>
              </Stack>
            </form>
          </CardBody>
        </Card>
      </Layout>
    </>
  );
}

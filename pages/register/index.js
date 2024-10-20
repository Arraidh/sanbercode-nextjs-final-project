import Layout from "@/layout";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

export default function Register() {
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
        .post("https://service.pace-unv.cloud/api/register", data)
        .then((res) => {
          setTimeout(() => {
            router.push("/login");
          }, "2000");
        })
        .catch((err) => {
          throw new Error(err?.response?.data?.message);
        }),
      {
        loading: "Loading",
        success: "Register Success",
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
              Register
            </Heading>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack gap={"8"}>
                <FormControl isInvalid={false}>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    placeholder={"Account Name"}
                    onChange={() => {}}
                    {...register("name")}
                  />
                  {!false ? (
                    <FormHelperText>Enter your account name</FormHelperText>
                  ) : (
                    <FormErrorMessage>Name is required.</FormErrorMessage>
                  )}
                </FormControl>

                <FormControl isInvalid={false}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    placeholder={"Email"}
                    onChange={() => {}}
                    {...register("email")}
                  />
                  {!false ? (
                    <FormHelperText>Enter your email account</FormHelperText>
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
                  Register
                </Button>
              </Stack>
            </form>
          </CardBody>
        </Card>
      </Layout>
    </>
  );
}

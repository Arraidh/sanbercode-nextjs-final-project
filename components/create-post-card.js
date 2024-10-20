import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function CreatePostCard() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    toast.promise(
      axios
        .post(`https://service.pace-unv.cloud/api/post`, data, {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        })
        .then((res) => {
          setValue("description", "");
          return;
        })
        .catch((err) => {
          throw new Error(err?.response?.data?.message);
        }),
      {
        loading: "Creating Post",
        success: "Post Created",
        error: (err) => {
          return err.toString();
        },
      }
    );
  };

  return (
    <>
      <Card>
        <CardHeader>Create Post</CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={2}>
              <Textarea
                {...register("description", { required: true, maxLength: 100 })}
                placeholder="What's on your mind?"
                size="sm"
                resize={"vartical"}
                isInvalid={errors.description?.type}
              />
              <Button colorScheme="red" className="!bg-rose-900" type="submit">
                Post
              </Button>
            </Stack>
          </form>
        </CardBody>
        <CardFooter>
          {errors.description?.type === "required" && (
            <p role="alert">Post is required</p>
          )}
        </CardFooter>
      </Card>
    </>
  );
}

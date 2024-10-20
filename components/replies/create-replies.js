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
import toast, { Toaster } from "react-hot-toast";
import { useSWRConfig } from "swr";

export default function CreateRepliesCard({ id }) {
  const { mutate } = useSWRConfig();
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
        .post(`https://service.pace-unv.cloud/api/replies/post/${id}`, data, {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        })
        .then((res) => {
          setValue("description", "");
          mutate(`https://service.pace-unv.cloud/api/replies/post/${id}`);
          mutate(`https://service.pace-unv.cloud/api/post/${id}`);
          return;
        })
        .catch((err) => {
          throw new Error(err?.response?.data?.message);
        }),
      {
        loading: "Creating Replies",
        success: "Replies Created",
        error: (err) => {
          return err.toString();
        },
      }
    );
  };

  return (
    <>
      <Toaster />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={2}>
          <Textarea
            {...register("description", { required: true, maxLength: 100 })}
            placeholder="What do you think about this post?"
            size="sm"
            resize={"vartical"}
            isInvalid={errors.description?.type}
          />
          <Button colorScheme="red" className="!bg-rose-900" type="submit">
            Post
          </Button>
          {errors.description?.type === "required" && (
            <p role="alert">Post is required</p>
          )}
        </Stack>
      </form>
    </>
  );
}

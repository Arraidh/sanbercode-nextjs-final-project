import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Stack,
  Textarea,
  Heading,
  Text,
} from "@chakra-ui/react";
import { FaEllipsisVertical } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { useRef } from "react";

import axios from "axios";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useSWR, { mutate, useSWRConfig } from "swr";
import indonesianDateFormat from "@/utils/date-format";

export default function ModifyPostMenu({ post }) {
  return (
    <>
      <Menu>
        <MenuButton
          as={Button}
          size={"sm"}
          onClick={(e) => e.stopPropagation()}
        >
          <FaEllipsisVertical />
        </MenuButton>
        <MenuList onClick={(e) => e.stopPropagation()}>
          <EditPost post={post} />

          <DeletePost post={post} />
        </MenuList>
      </Menu>
    </>
  );
}

function EditPost({ post }) {
  const { mutate } = useSWRConfig();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

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
          onClose();
          mutate("https://service.pace-unv.cloud/api/posts?type=all");
          return;
        })
        .catch((err) => {
          throw new Error(err?.response?.data?.message);
        }),
      {
        loading: "Updating Post",
        success: "Post Updated",
        error: (err) => {
          return err.toString();
        },
      }
    );
  };

  return (
    <>
      <MenuItem className="flex gap-4" onClick={onOpen}>
        <EditIcon /> Edit
      </MenuItem>
      {/* <Button variant={"ghost"}  className="w-full">
      </Button> */}

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Edit Post
              </AlertDialogHeader>

              <AlertDialogBody>
                <Stack gap={2}>
                  <Textarea
                    {...register("description", {
                      required: true,
                      maxLength: 100,
                    })}
                    defaultValue={post?.description}
                    placeholder="What's on your mind?"
                    size="sm"
                    resize={"vartical"}
                    isInvalid={errors.description?.type}
                  />
                  {errors.description?.type === "required" && (
                    <p role="alert">Post is required</p>
                  )}
                </Stack>
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  colorScheme="red"
                  className="!bg-rose-900"
                  type="submit"
                  ml={3}
                >
                  Edit
                </Button>
              </AlertDialogFooter>
            </form>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

function DeletePost({ post }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const handleDelete = () => {
    toast.promise(
      axios
        .delete(`https://service.pace-unv.cloud/api/post/delete/${post.id}`, {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        })
        .then((res) => {
          onClose();
          mutate("https://service.pace-unv.cloud/api/posts?type=all");
          return;
        })
        .catch((err) => {
          throw new Error(err?.response?.data?.message);
        }),
      {
        loading: "Deleting Post",
        success: "Post Deleted",
        error: (err) => {
          return err.toString();
        },
      }
    );
  };

  return (
    <>
      <MenuItem className="flex gap-4" onClick={onOpen}>
        <DeleteIcon /> Remove
      </MenuItem>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Post
              <Text size={"xs"} fontWeight={"normal"}>
                Are you sure you want to delete this post?
              </Text>{" "}
            </AlertDialogHeader>

            <AlertDialogBody>
              <div className="p-4 shadow-lg bg-red-50 ">
                <Heading size={"md"}>{post?.description}</Heading>
                <Text size={"xs"}>
                  {indonesianDateFormat(post?.created_at)}
                </Text>
              </div>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                className="!bg-rose-900"
                onClick={handleDelete}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

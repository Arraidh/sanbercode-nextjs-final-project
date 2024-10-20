import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  IconButton,
  Spinner,
  Stack,
  Text,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import CreateRepliesCard from "./create-replies";
import useSWR, { mutate, useSWRConfig } from "swr";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa6";

const fetcher = (url) =>
  axios
    .get(url, { headers: { Authorization: `Bearer ${Cookies.get("token")} ` } })
    .then((res) => res.data);

export default function RepliesCard({ post }) {
  const [replies, setReplies] = useState();

  const { data, error, isLoading } = useSWR(
    `https://service.pace-unv.cloud/api/replies/post/${post?.id}`,
    fetcher
  );

  return (
    <>
      <Card>
        <CardHeader>
          <Heading>Replies {post?.replies_count}</Heading>
        </CardHeader>
        <CardBody>
          <CreateRepliesCard id={post?.id} />
        </CardBody>
        <CardFooter className="w-full">
          {" "}
          <Stack gap={4} className="divide-y w-full">
            {" "}
            {isLoading ? (
              <></>
            ) : (
              data?.data.map((reply) => (
                <>
                  <div key={reply?.id}>
                    <Stack gap={2}>
                      <div className="mt-4 flex justify-between ">
                        <Stack gap={0}>
                          <Heading size={"sm"}>{reply?.user?.name}</Heading>
                          <Text fontSize={"xs"}>{reply?.user?.email}</Text>
                        </Stack>
                        {reply?.is_own_reply ? (
                          <>
                            <DeleteReplies id={reply?.id} post={post?.id} />
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                      <Text fontSize={"sm"}>{reply?.description}</Text>
                    </Stack>
                  </div>
                </>
              ))
            )}
          </Stack>
        </CardFooter>
      </Card>
    </>
  );
}

function DeleteReplies({ id, post }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  function handleDelete() {
    console.log(`https://service.pace-unv.cloud/api/replies/post/${post}`);
    toast.promise(
      axios
        .delete(`https://service.pace-unv.cloud/api/replies/delete/${id}`, {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        })
        .then((res) => {
          onClose();
          mutate(`https://service.pace-unv.cloud/api/replies/post/${post}`);
          return;
        })
        .catch((err) => {
          throw new Error(err?.response?.data?.message);
        }),
      {
        loading: "Deleting reply",
        success: "Reply deleted",
        error: (err) => err.toString(),
      }
    );
  }

  return (
    <>
      {" "}
      <IconButton icon={<FaTrash />} size={"sm"} onClick={onOpen}></IconButton>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

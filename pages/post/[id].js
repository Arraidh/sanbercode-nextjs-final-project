import Layout from "@/layout";
import { useRouter } from "next/router";
import indonesianDateFormat from "@/utils/date-format";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import CreateRepliesCard from "@/components/replies/create-replies";
import useSWR from "swr";
import RepliesCard from "@/components/replies/replies-card";

const fetcher = (url) =>
  axios
    .get(url, { headers: { Authorization: `Bearer ${Cookies.get("token")} ` } })
    .then((res) => res.data);

export default function Page() {
  const [post, setPost] = useState();
  const router = useRouter();
  const { id } = router.query;

  const { data, error, isLoading } = useSWR(
    `https://service.pace-unv.cloud/api/post/${id}`,
    fetcher
  );

  useEffect(() => {
    if (id) {
      setPost(data?.data);
    }
  }, [data]);

  return (
    <>
      <Layout>
        {" "}
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <div className="grid grid-cols-1 gap-2 w-full max-w-lg">
              <Card className="w-full  shadow-xl mx-auto">
                <CardHeader onClick={() => router.push(`/post/${post?.id}`)}>
                  <Stack gap={4}>
                    <Stack gap={2}>
                      <Heading className="text-ellipsis overflow-hidden line-clamp-1">
                        {post?.user?.name}
                      </Heading>
                      <Text>{post?.user?.email}</Text>
                    </Stack>
                    {/* <Text>{indonesianDateFormat(post?.created_at)}</Text> */}
                  </Stack>
                </CardHeader>

                <CardBody onClick={() => router.push(`/post/${post?.id}`)}>
                  {post?.description}
                </CardBody>
                <CardFooter>
                  <ButtonGroup variant="ghost" spacing="2" className="w-full">
                    <Button
                      colorScheme={post?.is_like_post ? "red" : "gray"}
                      className="w-full"
                      leftIcon={
                        post?.is_like_post ? <FaHeart /> : <FaRegHeart />
                      }
                    >
                      {post?.likes_count} Save
                    </Button>

                    <Button
                      colorScheme="gray"
                      className="w-full"
                      leftIcon={<FaRegComment />}
                      disabled
                    >
                      {post?.replies_count} Comment
                    </Button>
                  </ButtonGroup>
                </CardFooter>
              </Card>
              <RepliesCard post={post} />
            </div>
          </>
        )}
      </Layout>
    </>
  );
}

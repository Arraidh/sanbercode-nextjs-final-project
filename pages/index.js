import CreatePostCard from "@/components/create-post-card";
import Layout from "@/layout";
import indonesianDateFormat from "@/utils/date-format";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Input,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";

export default function Home() {
  const router = useRouter();
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    axios
      .get("https://service.pace-unv.cloud/api/posts?type=all", {
        headers: { Authorization: `Bearer ${Cookies.get("token")} ` },
      })
      .then((res) => {
        const arr = res?.data.data || [];
        setPostData(arr);
      });
  }, []);
  return (
    <>
      <Layout>
        <div className="w-full max-w-md grid grid-cols-1 gap-2">
          <CreatePostCard />
          {postData.map((post) => (
            <Card className="w-full  shadow-xl  ">
              <CardHeader onClick={() => router.push(`/post/${post?.id}`)}>
                <Stack gap={4}>
                  <Stack gap={2}>
                    <Heading className="text-ellipsis overflow-hidden line-clamp-1">
                      {post?.user?.name}
                    </Heading>
                    <Text>{post?.user?.email}</Text>
                  </Stack>
                  <Text>{indonesianDateFormat(post?.created_at)}</Text>
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
                    leftIcon={post?.is_like_post ? <FaHeart /> : <FaRegHeart />}
                  >
                    {post?.likes_count} Like
                  </Button>

                  <Button
                    colorScheme="gray"
                    className="w-full"
                    leftIcon={<FaRegComment />}
                  >
                    {post?.replies_count} Comment
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Layout>
    </>
  );
}

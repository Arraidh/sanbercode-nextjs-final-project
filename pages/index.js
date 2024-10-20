import CreatePostCard from "@/components/create-post-card";
import ModifyPostMenu from "@/components/modify-post-menu";
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
  Spinner,
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
import useSWR from "swr";

const fetcher = (url) =>
  axios
    .get(url, { headers: { Authorization: `Bearer ${Cookies.get("token")} ` } })
    .then((res) => res.data);

export default function Home() {
  const router = useRouter();

  const { data, error, isLoading } = useSWR(
    "https://service.pace-unv.cloud/api/posts?type=all",
    fetcher
  );

  useEffect(() => {}, []);

  return (
    <>
      <Layout>
        <div className="w-full max-w-md grid grid-cols-1 gap-2">
          <CreatePostCard />
          {isLoading ? (
            <>
              <Spinner className="mx-auto mt-8" />
            </>
          ) : (
            <>
              {" "}
              {data?.data?.map((post) => (
                <Card className="w-full  shadow-xl  ">
                  <CardHeader
                    onClick={(e) => {
                      e.preventDefault();
                      router.push(`/post/${post?.id}`);
                    }}
                    className="parent"
                  >
                    <Stack gap={4}>
                      <Stack gap={2}>
                        <div className="flex justify-between items-center">
                          <Heading
                            size={"md"}
                            className="text-ellipsis overflow-hidden line-clamp-1"
                          >
                            {post?.user?.name}
                          </Heading>
                          {post?.is_own_post ? (
                            <ModifyPostMenu post={post} />
                          ) : (
                            ""
                          )}
                        </div>
                        <Text fontSize={"xs"}>{post?.user?.email}</Text>
                      </Stack>
                      <Text fontSize={"xs"}>
                        {indonesianDateFormat(post?.created_at)}
                      </Text>
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
            </>
          )}
        </div>
      </Layout>
    </>
  );
}

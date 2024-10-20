import Layout from "@/layout";
import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import useSWR from "swr";
import { FaHeart } from "react-icons/fa6";
import { FaComment } from "react-icons/fa";
import indonesianDateFormat from "@/utils/date-format";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

const fetcher = (url) =>
  axios
    .get(url, { headers: { Authorization: `Bearer ${Cookies.get("token")} ` } })
    .then((res) => res.data);

const notificationType = (remark) => {
  const type = {
    like: (
      <>
        <Avatar size="sm" bg={"red.100"} color={"red.500"} icon={<FaHeart />} />{" "}
      </>
    ),
    reply: (
      <>
        <Avatar
          size="sm"
          bg={"yellow.100"}
          color={"yellow.500"}
          icon={<FaComment />}
        />
      </>
    ),
  };
  return type[remark];
};

export default function Notification() {
  const router = useRouter();
  const { data, error, isLoading } = useSWR(
    "https://service.pace-unv.cloud/api/notifications",
    fetcher
  );
  console.log(data);
  return (
    <>
      <Layout>
        <Card className="w-full max-w-md">
          <CardHeader>
            <Heading size={"md"} className="flex gap-2 items-center">
              {" "}
              <IconButton
                variant="ghost"
                colorScheme={"red"}
                aria-label="Back to Home Page"
                icon={<ChevronLeftIcon />}
                className="my-4"
                onClick={() => {
                  router.push("/");
                }}
              />
              Notification
            </Heading>
          </CardHeader>
          <CardBody>
            <Stack gap={4} className="divide-y">
              {" "}
              {isLoading ? (
                <Spinner></Spinner>
              ) : (
                data?.data?.map((notif) => (
                  <Stack gap={4} className="py-4">
                    <Text fontSize={"xs"} className=" flex gap-2">
                      {notificationType(notif?.remark)}
                      <Stack gap={0}>
                        <Flex gap={1}>
                          <span className="font-bold">{notif?.user?.name}</span>
                          <Text> {notif?.remark} to your post</Text>
                        </Flex>
                        <Text fontSize={"xx-small"}>
                          {indonesianDateFormat(notif?.created_at)}
                        </Text>
                      </Stack>
                    </Text>

                    <div className="bg-gray-50 shadow-lg w-full rounded-lg px-2 py-4">
                      <Stack gap={4}>
                        {" "}
                        <div className="flex items-center gap-2">
                          <Avatar size={"xs"} name={notif?.user.name} />
                          <Stack gap={0}>
                            <Flex gap={1}>
                              <Text fontSize={"xs"} className="font-bold">
                                {notif?.user?.name}
                              </Text>
                            </Flex>
                            <Text fontSize={"xx-small"}>
                              {indonesianDateFormat(notif?.created_at)}
                            </Text>
                          </Stack>
                        </div>
                        <Text fontSize={"xs"}>{notif?.posts?.description}</Text>
                      </Stack>
                    </div>
                  </Stack>
                ))
              )}
            </Stack>
          </CardBody>
        </Card>
      </Layout>
    </>
  );
}

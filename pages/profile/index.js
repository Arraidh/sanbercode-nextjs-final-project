import { UserContext } from "@/context/userContext";
import Layout from "@/layout";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Heading,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext } from "react";

export default function Profile() {
  const router = useRouter();
  const { userData } = useContext(UserContext);
  return (
    <>
      <Layout>
        <div className="w-full max-w-lg ">
          <Card className="!shadow-lg">
            <CardHeader>
              <Stack gap={2}>
                <div className="flex items-center gap-4">
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
                  <Heading as="h1" size="xl" className="text-rose-900">
                    Profile
                  </Heading>
                </div>

                <Divider />
              </Stack>
            </CardHeader>
            <CardBody>
              <Stack gap={8}>
                <Stack gap={2}>
                  <Heading as="h6" size="md" className="text-rose-900">
                    Name
                  </Heading>
                  <Text fontSize={"sm"}>{userData?.data?.name}</Text>
                </Stack>
                <Stack gap={2}>
                  <Heading as="h6" size="md" className="text-rose-900">
                    Email
                  </Heading>
                  <Text fontSize={"sm"}>{userData?.data?.email}</Text>
                </Stack>
                <Stack gap={2}>
                  <Heading as="h6" size="md" className="text-rose-900">
                    Birth Date
                  </Heading>
                  <Text fontSize={"sm"}>{userData?.data?.dob}</Text>
                </Stack>
                <Stack gap={2}>
                  <Heading as="h6" size="md" className="text-rose-900">
                    Phone Number
                  </Heading>
                  <Text fontSize={"sm"}>{userData?.data?.phone}</Text>
                </Stack>
                <Stack gap={2}>
                  <Heading as="h6" size="md" className="text-rose-900">
                    Hobby
                  </Heading>
                  <Text fontSize={"sm"}>{userData?.data?.hobby}</Text>
                </Stack>
                <Stack gap={2}>
                  <Heading as="h6" size="md" className="text-rose-900">
                    Created at
                  </Heading>
                  <Text fontSize={"sm"}>{userData?.data?.created_at}</Text>
                </Stack>
                <Stack gap={2}>
                  <Heading as="h6" size="md" className="text-rose-900">
                    Updated at
                  </Heading>
                  <Text fontSize={"sm"}>{userData?.data?.updated_at}</Text>
                </Stack>
              </Stack>
            </CardBody>
          </Card>
        </div>
      </Layout>
    </>
  );
}

import Layout from "@/layout";
import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";

export default function Login() {
  return (
    <>
      <Layout>
        <Card>
          <CardHeader>
            <Heading size={"lg"} className="text-rose-900">
              Login
            </Heading>
          </CardHeader>
          <CardBody>
            <Stack gap={"8"}>
              <FormControl isInvalid={false}>
                <FormLabel>Email</FormLabel>
                <Input type="email" placeholder={"input"} onChange={() => {}} />
                {!false ? (
                  <FormHelperText>
                    Enter the email you'd like to receive the newsletter on.
                  </FormHelperText>
                ) : (
                  <FormErrorMessage>Email is required.</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={false}>
                <FormLabel>Password</FormLabel>
                <Input type="email" value={"input"} onChange={() => {}} />
                {!false ? (
                  <FormHelperText>
                    Enter the email you'd like to receive the newsletter on.
                  </FormHelperText>
                ) : (
                  <FormErrorMessage>Email is required.</FormErrorMessage>
                )}
              </FormControl>
            </Stack>
          </CardBody>
        </Card>
      </Layout>
    </>
  );
}

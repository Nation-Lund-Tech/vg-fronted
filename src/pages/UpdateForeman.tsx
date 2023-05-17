import {
  HStack,
  Input,
  Button,
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  StackDivider,
  Spacer,
  Flex,
  Box,
  useToast,
  Link,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";

interface updateForemanForm {
  firstName: string;
  lastName: string;
  oldEmail: string;
  newEmail: string;
  password: string;
}

export default function UpdateForeman() {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<updateForemanForm>();

  const toast = useToast();

  // Tom body returneras av API:et om email inte finns, det måste vi hantera

  const onSubmit: SubmitHandler<updateForemanForm> = async (data) => {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/User/foreman/update`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          newEmail: data.newEmail,
          oldEmail: data.oldEmail,
          password: data.password,
        }),
      }
    );

    if (response.status === 409) {
      toast({
        title: "Error",
        description: "Could not update foreman",
        status: "error",
        isClosable: true,
      });
      return;
    }

    toast({
      title: "Success",
      description: "Foreman was updated successfully",
      status: "success",
      isClosable: true,
    });

    reset();
  };

  return (
    <Layout>
      <Flex justifyContent="center" alignItems="center" p="4">
        <VStack
          divider={<StackDivider />}
          p="4"
          w="100%"
          spacing="1rem"
          maxW={{ base: "100vw", sm: "80vw", lg: "70vw", xl: "60vw" }}
          alignItems="stretch"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors.firstName !== undefined}>
              <FormLabel>First name</FormLabel>
              <Input
                id="firstName"
                placeholder="First name"
                {...register("firstName", {
                  required: "First name is required",
                })}
              />
              <FormErrorMessage>
                {errors.firstName && errors.firstName.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.lastName !== undefined}>
              <FormLabel>Surname</FormLabel>
              <Input
                id="surname"
                placeholder="Surname"
                {...register("lastName", {
                  required: "Surname is required",
                })}
              />
              <FormErrorMessage>
                {errors.lastName && errors.lastName.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.newEmail !== undefined}>
              <FormLabel>New Email</FormLabel>
              <Input
                id="newEmail"
                placeholder="new Email"
                {...register("newEmail", {
                  required: "New email is required",
                  pattern: {
                    value: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
                    message: "Invalid email",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.oldEmail && errors.oldEmail.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.oldEmail !== undefined}>
              <FormLabel>Old email</FormLabel>
              <Input
                id="oldEmail"
                placeholder="Old email"
                {...register("oldEmail", {
                  required: "Old email is required",
                  pattern: {
                    value: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
                    message: "Invalid email",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.oldEmail && errors.oldEmail.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.password !== undefined}>
              <FormLabel>Password</FormLabel>
              <Input
                id="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            <HStack mt={"1rem"}>
              <Button
                colorScheme="green"
                type="submit"
                isLoading={isSubmitting}
              >
                Update foreman
              </Button>
              <Spacer />
              <Link href="/foremen">
                <Button size="md">Cancel</Button>
              </Link>
            </HStack>
          </form>
        </VStack>
      </Flex>
    </Layout>
  );
}

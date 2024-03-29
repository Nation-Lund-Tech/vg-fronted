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
  Center,
} from "@chakra-ui/react";
import WorkerFrom from "./WorkerForm";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import Layout from "../components/Layout";

interface WorkerForm {
  firstName: string;
  lastName: string;
  email: string;
  foodPref: string;
}

export default function AddWorker() {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<WorkerForm>();

  const toast = useToast();

  // Tom body returneras av API:et om email inte finns, det måste vi hantera

  const onSubmit: SubmitHandler<WorkerForm> = async (data) => {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/Worker`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          foodPref: data.foodPref,
        }),
      }
    );

    if (response.status === 409) {
      toast({
        title: "Error",
        description: "Worker already exists",
        status: "error",
        isClosable: true,
      });
      return;
    }

    toast({
      title: "Success",
      description: "Worker was added successfully",
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
            <FormControl isInvalid={errors.email !== undefined}>
              <FormLabel>Email</FormLabel>
              <Input
                id="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
                    message: "Invalid email",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl>
              <FormLabel>Food preference</FormLabel>
              <Input
                id="foodPref"
                placeholder="Food Preference"
                {...register("foodPref")}
              />
            </FormControl>

            <HStack mt={"1rem"}>
              <Button
                colorScheme="green"
                type="submit"
                isLoading={isSubmitting}
              >
                Create Worker
              </Button>

              <Spacer />

              <Link href="/workers">
                <Button size="md">Cancel</Button>
              </Link>
            </HStack>
          </form>
        </VStack>
      </Flex>
    </Layout>
  );
}

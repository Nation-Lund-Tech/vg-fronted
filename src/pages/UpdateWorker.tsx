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
import { useEffect, useState } from "react";
import { Worker } from "../Common/Types";

interface UpdateWorkerForm {
  firstName: string;
  lastName: string;
  email: string;
  oldEmail: string;
  foodPref: string;
  bank: number;
}

export default function AddWorker() {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateWorkerForm>();

  const toast = useToast();

  const { workerId } = useParams<{ workerId: string }>();
  const [worker, setWorker] = useState<Worker>();

  const getWorker = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/Worker/id/${workerId}`
    );
    const data: Worker = await response.json();
    setWorker(data);
  };
  
  useEffect(() => {
    getWorker();
  }, []);
  
  // Tom body returneras av API:et om email inte finns, det måste vi hantera

  const onSubmit: SubmitHandler<UpdateWorkerForm> = async (data) => {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/Worker/update`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          newEmail: data.email,
          foodPref: data.foodPref,
          bank: worker?.bank,
          oldEmail: data.oldEmail,
        }),
      }
    );

    if (response.status === 409) {
      toast({
        title: "Error",
        description: "Could not update worker",
        status: "error",
        isClosable: true,
      });
      return;
    }

    if (response.status === 404) {
      toast({
        title: "Error",
        description: "Email does not exist",
        status: "error",
        isClosable: true,
      });
      return;
    }

    toast({
      title: "Success",
      description: "Worker was updated successfully",
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
                {...register("firstName")}
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
                {...register("lastName")}
              />
              <FormErrorMessage>
                {errors.lastName && errors.lastName.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.email !== undefined}>
              <FormLabel>New Email</FormLabel>
              <Input
                id="newEmail"
                placeholder="new Email"
                {...register("email", {
                  required: "New email is required",
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
                Update worker
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

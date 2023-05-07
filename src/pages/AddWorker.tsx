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
} from "@chakra-ui/react";
import WorkerFrom from "./WorkerForm";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";

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

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit: SubmitHandler<WorkerForm> = async (data) => {
    const response = await fetch("https://localhost:7008/api/Worker", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        foodPref: data.foodPref,
      }),
    });
    const result = await response.json();
    console.log(result);
    reset();
  };


  return (
    <Flex justifyContent="center" alignItems="center" p="4">
      <VStack
        divider={<StackDivider />}
        borderColor="gray.100"
        borderWidth="2px"
        p="4"
        borderRadius="lg"
        w="100%"
        maxW={{ base: "90vw", sm: "80vw", lg: "50vw", xl: "40vw" }}
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
          <Spacer p="3" />
          <Button type="submit" isLoading={isSubmitting}>
            Create Worker
          </Button>
        </form>
      </VStack>
    </Flex>
  );
}

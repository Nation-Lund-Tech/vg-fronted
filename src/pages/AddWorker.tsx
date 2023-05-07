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

  const [usedEmail, setUsedEmail] = useState(false);

  async function checkIfEmailExists(email: string): Promise<boolean> {
    const response = await fetch(
      `https://localhost:7008/api/Worker/email/${email}`
    );
    const data = await response.json();
    return !!data; // Returns true if data is not null or undefined
  }

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

    let emailExists = await checkIfEmailExists(data.email);
    if (emailExists) {
      console.log("Email already exists");
      setUsedEmail(true);
      return;
    }

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

          {usedEmail && (
            <Box color="red.500" p="2" borderRadius="md">
              Worker already exists!
            </Box>
          )}

          <Spacer p="2" />

          <Button type="submit" isLoading={isSubmitting}>
            Create Worker
          </Button>
        </form>
      </VStack>
    </Flex>
  );
}

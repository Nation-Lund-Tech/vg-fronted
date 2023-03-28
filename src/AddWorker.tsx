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

interface WorkerForm {
  firstName: string;
  surname: string;
  email: string;
}

export default function AddWorker() {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<WorkerForm>();

  const onSubmit: SubmitHandler<WorkerForm> = (data) => {
    console.log(data);
    // fetch req till server
  };

  return (
    <Flex justifyContent="center" alignItems="center" p='4'>
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
          <FormControl isInvalid={errors.surname !== undefined}>
            <FormLabel>Surname</FormLabel>
            <Input
              id="surname"
              placeholder="Surname"
              {...register("surname", {
                required: "Surname is required",
              })}
            />
            <FormErrorMessage>
              {errors.surname && errors.surname.message}
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
          <Spacer p="3" />
          <Button type="submit" isLoading={isSubmitting}>
            Create Worker
          </Button>
        </form>
      </VStack>
    </Flex>
  );
}

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
import WorkerFrom from "./WorkerForm";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";

interface ForemanForm {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export default function AddWorker() {
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ForemanForm>();

    const toast = useToast();

    const [error, setError] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [repeatPassword, setRepeatPassword] = useState<string>("");

    // Tom body returneras av API:et om email inte finns, det måste vi hantera

    const onSubmit: SubmitHandler<ForemanForm> = async (data) => {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/Auth/registerForeman`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password,
            }),
        });


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
                    <FormControl isInvalid={errors.password !== undefined}>
                        <FormLabel>Password</FormLabel>
                        <Input
                            id="password"
                            placeholder="Password"
                            {...register("password", {
                                required: "Password is required",
                            })}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl >
                        <FormLabel>Repeat Password</FormLabel>
                        <Input
                            placeholder="Repeat Password"
                            onChange={(event) =>
                                setRepeatPassword(event.target.value)}
                        />
                        {password !== repeatPassword && (
                            <FormErrorMessage>Passwords must match!</FormErrorMessage>
                        )}
                    </FormControl>

                    <Spacer p="2" />

                    <HStack spacing={"16rem"}>
                        <Button 
                        color={"white"}
                        background={"green.400"}
                        type="submit"
                        isDisabled={password !== repeatPassword }
                        isLoading={isSubmitting}
                        >
                            Create Foreman
                        </Button>
                        <Link href="/foremen">
                            <Button size='md'>
                                Cancel
                            </Button>
                        </Link>
                    </HStack>
                </form>
            </VStack>
        </Flex>
    );
}

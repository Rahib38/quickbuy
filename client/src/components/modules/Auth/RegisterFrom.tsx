/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Toaster, toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerUser } from "@/services/AuthService";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerValidation } from "./registerValidation";

interface RegisterFromProps {
  heading?: string;
  subheading?: string;
  logo: {
    url: string;
    src: string;
    alt: string;
    title?: string;
  };
  signupText?: string;
  googleText?: string;
  loginText?: string;
  loginUrl?: string;
}

const RegisterFrom = ({
  heading = "Signup",
  subheading = "Create a new account",
  logo = {
    url: "https://www.shadcnblocks.com",
    src: "https://shadcnblocks.com/images/block/block-1.svg",
    alt: "logo",
    title: "shadcnblocks.com",
  },
  // googleText = "Sign up with Google",
  loginText = "Already have an account?",
  loginUrl = "/login",
}: RegisterFromProps) => {
  const form = useForm({
    resolver: zodResolver(registerValidation)
  });

  // const router = useRouter();

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await registerUser(data);
      if (res.success) {
        toast.success(res?.message);
      } else {
        toast.error(res.message);
      }
      console.log(res);
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <section className="h-screen bg-gray-50">
      <div className="flex h-full items-center justify-center">
        <div className="flex w-full max-w-md flex-col items-center gap-y-8 rounded-lg border border-blue-400 bg-white px-6 py-12 shadow-lg sm:px-10">
          <div className="flex flex-col items-center gap-y-2">
            {/* Logo */}
            <div className="flex items-center gap-1">
              <a href={logo.url}>
                {/* <img src={logo.src} alt={logo.alt} title={logo.title} className="h-12" /> */}
              </a>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">{heading}</h1>
            {subheading && (
              <p className="text-sm text-gray-500">{subheading}</p>
            )}
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
              <div className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-gray-700">
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-full rounded-md border-gray-300 py-3 px-4 text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          type="text"
                          placeholder="Enter your full name"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-gray-700">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-full rounded-md border-gray-300 py-3 px-4 text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          type="email"
                          placeholder="Enter your email"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-gray-700">
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-full rounded-md border-gray-300 py-3 px-4 text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          type="password"
                          placeholder="Enter your password"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="mt-2 w-full bg-blue-600 text-white hover:bg-blue-700"
                >
                  {isSubmitting ? "Registering..." : "Create an account"}
                </Button>
              </div>

              <div className="mt-6 text-center text-sm text-gray-600">
                <p>
                  {loginText}{" "}
                  <Link
                    href={loginUrl}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </Form>
        </div>
        <Toaster richColors />
      </div>
    </section>
  );
};

export { RegisterFrom };

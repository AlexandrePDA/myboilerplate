"use client";

import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email({ message: "Email invalide" }),
  password: z.string().min(8, { message: "8 caractères minimums" }),
});

export default function FormLogin() {
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError(false);
    setLoading(true);
    const { email, password } = values;

    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/dashboard",
      });

      if (response?.status !== 200) {
        setError(true);
        setLoading(false);
        return console.log("Échec de l'authentification");
      }

      return (window.location.href = "/dashboard");
    } catch (error) {
      setError(true);
      setLoading(false);

      console.error("error", error);
    } finally {
      setLoading(false);
      form.reset();
    }
  }

  return (
    <div className=" max-w-sm mx-auto border p-4 rounded-md mt-40">
      <h2 className="my-4 font-bold">🔐 Connexion</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="coucou@mail.com" {...field} />
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
                <FormLabel>Mot de passe</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="************"
                    {...field}
                  />
                </FormControl>
                <FormDescription>8 caractères minimums</FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />
          {/* TODO : mdp oublié */}
          {error && (
            <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive my-4">
              <ExclamationTriangleIcon className="h-4 w-4" />
              <p>Mot de passe ou email invalide</p>
            </div>
          )}
          <Button disabled={loading} type="submit">
            Submit
          </Button>
        </form>
      </Form>
      <Link
        href="/reset"
        className="text-sm text-gray-400 underline mt-8 block text-center"
      >
        Mot de passe oublié?
      </Link>
      <Link
        href="/register"
        className="text-sm text-gray-400 underline  block text-center"
      >
        Pas encore de compte ?
      </Link>
    </div>
  );
}

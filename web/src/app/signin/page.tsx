"use client"

import React from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "@/lib/firebase"
import { useRouter } from 'next/navigation';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import Image from 'next/image';

const signinSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
})

export default function SignInScreen() {
  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof signinSchema>) {
    try {
      const auth = getAuth(app);
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;

      // Get user data from Firestore
      const db = getFirestore(app);
      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const gender = userData?.gender;

        // Redirect based on gender
        if (gender === 'male') {
          router.push('/home/male');
        } else if (gender === 'female') {
          router.push('/home/female');
        } else {
          // Handle case where gender is not defined
          console.error("Gender not defined for user.");
          // Redirect to a default home page or display an error
        }
      } else {
        console.error("User data not found in Firestore.");
        // Handle case where user data is not found
        // Redirect to a default home page or display an error
      }
    } catch (error: any) {
      console.error("Sign-in failed", error);
    }
  }

  return (
    <div className="flex items-center justify-center h-screen" style={{ backgroundColor: '#DEF5BA' }}>
      <Card className="w-full max-w-md p-6" style={{ backgroundColor: '#DEF5BA', boxShadow: 'none', border: 'none' }}>
        <CardHeader className="flex flex-col items-center space-y-2 p-0">
          <Image
            src="/images/logo-512x512.png"
            alt="App Logo"
            width={100}
            height={100}
            className="mb-6"
          />
          <h1 className="text-2xl font-semibold">Sign In</h1>
          <p className="text-sm text-muted-foreground">Enter your credentials to access your account.</p>
        </CardHeader>
        <CardContent className="p-0 mt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john.doe@example.com" {...field} className="border-gray-300 bg-white" />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} className="border-gray-300 bg-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full mt-6" 
                style={{ backgroundColor: '#E9D5FF', color: 'white' }}
              >
                Sign In
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
"use client"

import { useForm } from "react-hook-form"
import { schema } from "./registrationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormState } from "react-dom";
import { useRef } from "react";


export const RegistrationForm = (
  { onFormAction }: {
    onFormAction: (
      prevState:
        {
          message: string;
          user?: z.infer<typeof schema>;
          issues?: string[];
        }
      ,
      data: FormData) => Promise<
        {
          message: string;
          user?: z.infer<typeof schema>;
          issues?: string[];
        }
      >
  }
) => {


  const [state, formAction] = useFormState(onFormAction, { message: "" })
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { firstName: '', last: '', email: '', zipcode: '' }
  });

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Form {...form}>
      <div>{state?.message}</div>
      <form
        ref={formRef}
        action={formAction}
        // onSubmit={form.handleSubmit(onSubmit)} 
        onSubmit={form.handleSubmit(() => formRef?.current?.submit())}
        className="space-y-8">
        <div className="flex gap-2">
          <FormField control={form.control} name="firstName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  First Name
                </FormLabel>
                <FormControl>
                  <Input placeholder="this is a placholder" {...field} />
                </FormControl>
                <FormDescription>Your First Name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField control={form.control} name="last"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  Last Name
                </FormLabel>
                <FormControl>
                  <Input placeholder="this is a placholder" {...field} />
                </FormControl>
                <FormDescription>Your Last Name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField control={form.control} name="zipcode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Zipcode
              </FormLabel>
              <FormControl>
                <Input placeholder="this is a placholder" {...field} />
              </FormControl>
              <FormDescription>Your Zipcode</FormDescription>
              <FormMessage />
            </FormItem>


          )}
        />
        <FormField control={form.control} name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email
              </FormLabel>
              <FormControl>
                <Input placeholder="this is a placholder" {...field} />
              </FormControl>
              <FormDescription>Your Email Address.</FormDescription>
              <FormMessage />
            </FormItem>


          )}
        />
        <Button type="submit">Submit</Button>

      </form>
    </Form >
  )
}

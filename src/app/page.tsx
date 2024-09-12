import Image from "next/image";
import { RegistrationForm } from "./RegistrationForm";
import { z } from "zod";
import { schema } from "./registrationSchema";

export default function Home() {
  const onFormAction = async (
    prevstate: {
      message: string;
      user?: z.infer<typeof schema>;
      issues?: string[];
    },
    formData: FormData) => {
    "use server"
    const data = Object.fromEntries(formData);
    const parsed = await schema.safeParseAsync(data);
    if (parsed.success) {
      return { message: "User Registered", user: parsed.data }
    } else {
      return { message: "Invalid data", error: parsed.error.issues.map((issues) => issues.message) }

    }
  }

  return (
    <div className="mx-auto max-w-xl">
      <RegistrationForm onFormAction={onFormAction} />
    </div>

  );
}

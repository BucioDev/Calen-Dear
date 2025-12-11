"use server"

import { requiredUser } from "./lib/hooks"
import prisma from "./lib/prisma"
import { parseWithZod} from "@conform-to/zod/v4"
import { onboardingSchema, onboardingSchemaValidation, settingsSchema } from "./lib/zodSchemas"
import { redirect } from "next/navigation"




export async function OnboardingAction(prevState: any, formData: FormData) {
  const session = await requiredUser();

  const submission = parseWithZod(formData, {
    schema: onboardingSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  // Async validation userName validadtion
  const existingUsername = await prisma.user.findUnique({
    where: { 
      userName: submission.value.userName,
    },
  });

  if (existingUsername) {
    return submission.reply({
      fieldErrors: {
        userName: ["This username is already taken"],
      },
    });
  }

  await prisma.user.update({
    where: { id: session.user?.id },
    data: {
      userName: submission.value.userName,
      name: submission.value.fullName,
    },
  });

  return redirect("/onboarding/grant-id")
}


export async function SettingsAction(prevState: any,formdata:FormData){
    const session = await requiredUser();

    const submission =  parseWithZod(formdata,{
        schema:settingsSchema,
    });

    if(submission.status !== "success"){
        return submission.reply();
    };

    const user = await prisma.user.update({
        where:{
            id:session.user?.id,
        },
        data:{
            name:submission.value.fullName,
            image:submission.value.profileImage
        },
    });

    return redirect("dashboard")
}
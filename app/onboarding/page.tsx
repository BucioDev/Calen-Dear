"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { OnboardingAction } from "../actions";
import {useForm} from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod/v4";
import { onboardingSchema } from "../lib/zodSchemas";
import { SubmitButton } from "../components/SubmitButtons";

export default function OnboardingRoute(){

    const [lastResult, action] = useActionState(OnboardingAction, undefined);

    const [form, fields] = useForm({
        lastResult,
        onValidate({formData}){
            return parseWithZod(formData, {
                schema:onboardingSchema
            })
        },

        shouldValidate:"onBlur",
        shouldRevalidate:"onInput",
    })

    return(
        <div className="min-h-screen  w-screen flex items-center justify-center">
            <Card className="w-2xl">
                <CardHeader>
                    <CardTitle>
                        Welcome to Calen-<span className="text-primary">Dear</span>
                    </CardTitle>
                    <CardDescription>
                        we need the follwing information to ser up your profile
                    </CardDescription>
                </CardHeader>
                <form id={form.id} onSubmit={form.onSubmit} 
                action={action} noValidate>
                <CardContent className="grid gap-y-5">
                    <div className="grid gap-y-2">
                        <Label>Full Name</Label>
                        <Input placeholder="Sam"
                        name={fields.fullName.name}
                        defaultValue={fields.fullName.initialValue}
                        key={fields.fullName.key}/>
                        <p className="text-red-500 text-sm">{fields.fullName.errors}</p>
                    </div>
                    <div className="grid gap-y-2">
                        <Label>Username</Label>
                        <div className="flex rounded-md">
                            <span className="inline-flex items-center px-3 rounded-l-md border-r-0 border-muted bg-muted text-sm text-muted-foreground w-[170px]">Calen-Dear.com/</span>
                            <Input placeholder="example-user-1" className="rounded-l-none"
                            name={fields.userName.name}
                            defaultValue={fields.userName.initialValue}
                            key={fields.userName.key}/>
                            
                        </div>
                        <p className="text-red-500 text-sm">{fields.userName.errors}</p>
                    </div>
                </CardContent>
                <CardFooter className="mt-5">
                   <SubmitButton text="Submit" className="w-full"/>
                </CardFooter>
                </form>
            </Card>
        </div>
    )
}
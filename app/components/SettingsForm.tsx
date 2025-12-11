"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SubmitButton } from "./SubmitButtons"
import { useActionState, useState } from "react"
import { SettingsAction } from "../actions"
import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod/v4"
import { settingsSchema } from "../lib/zodSchemas"
import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"


interface settingsProps  {
fullName: string,
email: string,
profileImage:string,
}

export function SettingsForm({email,fullName,profileImage}:settingsProps){
    const [currentProfileImage, setCurrentProfileImage] = useState(profileImage)
    const [lastResult, action] = useActionState(SettingsAction, undefined);

    const [form, fields] = useForm({
        lastResult,

        onValidate({formData}){
            return parseWithZod(formData,{
                schema:settingsSchema
            });
        },

        shouldValidate:"onBlur",
        shouldRevalidate:"onInput"
    }); 

    const handleDeleteImage = () => {
        setCurrentProfileImage("")
    }

    return(
        <Card>
        <CardHeader>
            <CardTitle>Settigs</CardTitle>
            <CardDescription>
                Manage your settings
            </CardDescription>
        </CardHeader>
        <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
            <CardContent className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <Label>Full name</Label>
                    <Input placeholder="sam"
                    defaultValue={fullName}
                    name={fields.fullName.name}
                    key={fields.fullName.key}/>
                    <p className="text-red-500 text-sm">{fields.fullName.errors}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <Label>Email</Label>
                    <Input placeholder="something@mail.com"
                    defaultValue={email}
                    disabled/>
                </div>
                <div className="flex flex-col gap-y-5">
                    <Label>Profile Image</Label>
                    {currentProfileImage ? (
                        <div className="relative size-16">
                            <img src={currentProfileImage} alt="Profile image"
                            className="size-16 rounded-lg"/>
                            <Button variant="destructive" 
                            size="icon" 
                            className="absolute -top-3 -right-3"
                            onClick={handleDeleteImage}
                            type="button">
                                <XIcon className="size-4"/>
                            </Button>
                        </div>
                        
                    ):(
                        <h1>No Image</h1>
                    )}
                    <Input placeholder="something@mail.com"
                    defaultValue={email}
                    disabled/>
                </div>
            </CardContent>
            <CardFooter className="mt-5">
                <SubmitButton text="Save Changes" />
            </CardFooter>
        </form>
    </Card>
    )
}
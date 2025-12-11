"use client"
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom"
import googleLogo from "@/public/googleLogo.png" 
import GitHubLogo from "@/public/GitHubLogo.png"
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface buttonProps {
    text: string;
    variant?:  "default" | "link"  | "destructive" | "outline" | "secondary" | "ghost" | null | undefined ;
    className?: string;
}

export function GoogleAuthButton(){
    const {pending} = useFormStatus();
    return(
        <>
        {pending ? (
            <Button variant="outline" disabled className="w-full">
                <Loader2 className="size-4 mr-2 animate-spin"/>
                Please wait...
            </Button>
        ) : (
            <Button variant="outline" className="w-full">
                <Image src={googleLogo} alt="Google Logo" className="size-4 mr-2"/>
                Sign in with Google
            </Button>
        )}
        </>
    )
}

export function GitHubAuthButton(){
    const {pending} = useFormStatus();
    return(
        <>
        {pending ? (
            <Button variant="outline" disabled className="w-full">
                <Loader2 className="size-4 mr-2 animate-spin"/>
                Please wait...
            </Button>
        ) : (
            <Button variant="outline" className="w-full">
                <Image src={GitHubLogo} alt="GitHub Logo" className="size-4 mr-2"/>
                Sign in with GitHub
            </Button>
        )}
        </>
    )
}


export function SubmitButton( { text , variant, className }:buttonProps){
    const {pending} = useFormStatus();
    return(
        <>
        {pending ? (
            <Button variant="outline" disabled className={cn("w-fit", className)}>
                <Loader2 className="size-4 mr-2 animate-spin"/>
                Please wait...
            </Button>
        ) : (
            <Button variant={variant} className={cn("w-fit", className)}>
                {text}
            </Button>
        )}
        </>
    )
}
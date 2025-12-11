import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import Logo from "@/public/Logo.png"
import { signIn } from "../lib/auth";
import { GitHubAuthButton, GoogleAuthButton } from "./SubmitButtons";
import { DialogTitle } from "@radix-ui/react-dialog";

export function AuthModal(){

    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    Try for Free
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[360px]">
                <DialogHeader className="flex flex-row items-center justify-center gap-2">
                    <DialogTitle></DialogTitle>
                    <Image src={Logo} alt="Logo" className="size-10"/>
                    <h4 className="text-3xl font-semibol">
                    Calen-<span className="text-primary">Dear</span>
                    </h4>
                </DialogHeader>
                <div className="flex flex-col mt-5 gap-3">
                    <form action={async() => {
                        "use server"
                        await signIn("google");
                    }} className="w-full">
                        <GoogleAuthButton/>
                    </form>
                    <form action={async () =>{
                        "use server"
                        await signIn("github");
                    } 
                    }
                    >
                        <GitHubAuthButton/>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}
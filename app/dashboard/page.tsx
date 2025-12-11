import { Sue_Ellen_Francisco } from "next/font/google";
import { auth } from "../lib/auth"
import { redirect } from "next/navigation";
import { requiredUser } from "../lib/hooks";

export default async function DasboardPage(){
    const session = await requiredUser();

    return (
        <div>
            <h1> Hello dashboard </h1>
        </div>
    )
}
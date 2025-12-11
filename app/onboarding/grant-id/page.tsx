import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import VideoGif from "@/public/almost-there.gif"
import Image from "next/image";
import { CalendarCheck2 } from "lucide-react";


export default function OnboardingRouteTwo(){
    return (
        <div className="min-h-screen w-screen flex items-center justify-center">
            <Card className="w-2xl">
                <CardHeader>
                    <CardTitle>
                        You are almost done!
                    </CardTitle>
                    <CardDescription>
                        we have to now connect your calendar to your account.
                        <Image src={VideoGif} alt="Almost there gif" className="w-full rounded-lg mt-2"/>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild className="w-full">
                        <Link href="/api/auth">
                        <CalendarCheck2 className="size-4 mr-2"/>
                        Connect calendar to your account
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
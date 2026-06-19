import { DAY_BANNER, NIGHT_BANNER } from "@/config";
import Image from "next/image";

export default function Banner() {
    
    return (
        <div className="relative h-[18vh] w-full overflow-hidden">
            <Image
                src={DAY_BANNER}
                alt="Daytime banner"
                fill
                priority
                className="object-cover dark:hidden"
            />
            <Image
                src={NIGHT_BANNER}
                alt="Nighttime banner"
                fill
                priority
                className="hidden object-cover dark:block"
            />
            
        </div>
    );
}


// 
import Image from "next/image";

export default function Banner() {
    return (
        <div className="relative h-[18vh] w-full overflow-hidden">
            <Image
                src="/day.png"
                alt="Daytime banner"
                fill
                priority
                className="block object-cover dark:hidden"
            />
            <Image
                src="/night.png"
                alt="Nighttime banner"
                fill
                priority
                className="hidden object-cover dark:block"
            />
        </div>
    );
}

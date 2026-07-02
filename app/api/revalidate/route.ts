import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request: NextRequest) {
    return handleRevalidate(request);
}

export async function POST(request: NextRequest) {
    return handleRevalidate(request);
}

async function handleRevalidate(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get("secret");
    const path = searchParams.get("path");

    const localSecret = process.env.REVALIDATE_SECRET;

    // Fail if secret key isn't configured in environmental variables
    if (!localSecret) {
        return NextResponse.json(
            { message: "REVALIDATE_SECRET is not configured on the server." },
            { status: 500 }
        );
    }

    // Fail if client token doesn't match server token
    if (secret !== localSecret) {
        return NextResponse.json(
            { message: "Invalid secret token." },
            { status: 401 }
        );
    }

    try {
        if (path) {
            // Revalidate a specific page path (e.g. /blog/hello-world)
            revalidatePath(path);
            return NextResponse.json({ revalidated: true, path, now: Date.now() });
        } else {
            // Revalidate the main listing and the dynamic layout structure by default
            revalidatePath("/blog");
            revalidatePath("/blog/[slug]");
            return NextResponse.json({
                revalidated: true,
                paths: ["/blog", "/blog/[slug]"],
                now: Date.now(),
            });
        }
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}

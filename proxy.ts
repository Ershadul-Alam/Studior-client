import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { headers } from "next/headers";
import { auth } from '@/lib/auth';

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {

    const session = await auth.api.getSession({
        headers: await headers()
    })
    console.log(session);
    
    const user = session?.user
    if(!user){
        return NextResponse.redirect(new URL('/sign-up', request.url))
    }
}



export const config = {
    matcher: ['/studios/:id', '/add-studio', '/bookings', '/your-studio', '/profile'],
}
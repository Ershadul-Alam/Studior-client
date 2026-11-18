import { auth } from '@/lib/auth';
import { headers } from "next/headers";

const getTokenFromServer = async() => {

    const JwtToken = await auth.api.getToken({
        headers: await headers(),
    })
    const token = JwtToken?.token

    return token;
};

export default getTokenFromServer;
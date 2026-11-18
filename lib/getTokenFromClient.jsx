import { authClient } from "@/lib/auth-client";

const getTokenFromClient = async() => {

    const { data } = await authClient.token()
      const token = data?.token

    return token;
};

export default getTokenFromClient;
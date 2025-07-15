import axios from "axios";
import { getSession } from "next-auth/react";

const getApi = async () => {
  const session = await getSession();

  return axios.create({
    baseURL:
      process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000/api/v1/",
    withCredentials: false,
    headers: {
      Authorization: `Bearer ${session?.user.token}`,
    },
  })
}

export default getApi;

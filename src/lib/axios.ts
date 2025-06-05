import axios from "axios";
import { getSession } from "next-auth/react";

const session = await getSession();
const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000/api/v1/",
  withCredentials: false, //false para nest
  headers: {
    Authorization: `Bearer ${session?.user.token}`,
  },
});

export default api;

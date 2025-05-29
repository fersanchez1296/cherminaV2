import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      token: string;
      name: string;
      Rol: { Rol: string; _id: string };
    };
  }
}

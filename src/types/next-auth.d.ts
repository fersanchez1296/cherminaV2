import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      token: string;
      name: string;
      rol: string;
      allowedAreas: string[];
    };
  }
}

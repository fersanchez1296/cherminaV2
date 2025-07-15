import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      accessToken: string,
      email: string;
      token: string;
      name: string;
      rol: string;
      celulas: string[]
      allowedAreas: string[];
    };
  }
}

declare module "express-session" {
  interface Session {
    pkceCodes: {
      challengeMethod: string;
      verifier: string;
      challenge: string;
    };
  }
}

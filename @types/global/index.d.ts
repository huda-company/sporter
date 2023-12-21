type JWTSession = {
  id: string;
  email: string;
  iat: number;
  exp: number;
};

interface NextApiRequestCustom<T> {
  query: T["query"];
  body: T["body"];
  cookies: Partial<{
    [key: string]: string;
  }>;
  session?: JWTSession;
  redis?: Redis;
}

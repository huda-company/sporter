export const statCode = {
  200: { status: 200 },
  400: { status: 400 },
  401: { status: 401 },
  500: { status: 500 },
};

export const respBody = {
  ERROR: {
    EXPIRED_INVALID_TOKEN: { message: "token not found / invalid token" },
    INC_EMAIL_PASSWORD: { message: "incorrect email or password" },
    UNKNOWN_EMAIL: { message: "unknown email" },
  },
  SUCCESS: {},
};

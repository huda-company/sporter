import { API_MSG } from "./apiRespMsg";

import { ErrorBodyType, SuccessBodyType } from "^/@types/models/server";

export const statCode = {
  200: { status: 200 },
  400: { status: 400 },
  401: { status: 401 },
  500: { status: 500 },
};

export const SUCCESS_BODY: SuccessBodyType = {
  success: true,
  data: null,
  message: "",
};

export const ERROR_BODY: ErrorBodyType = {
  success: false,
  error: null,
  message: "",
};

export const respBody = {
  ERROR: {
    UNEXPECTED_ERROR: {
      ...ERROR_BODY,
      message: API_MSG.ERROR.UNEXPECTED_ERROR,
    },
    EXPIRED_INVALID_TOKEN: {
      ...ERROR_BODY,
      message: API_MSG.ERROR.EXPIRED_INVALID_TOKEN,
    },
    INC_EMAIL_PASSWORD: {
      ...ERROR_BODY,
      message: API_MSG.ERROR.INC_EMAIL_PASSWORD,
    },
    UNKNOWN_EMAIL: { ...ERROR_BODY, message: API_MSG.ERROR.UNKNOWN_EMAIL },
    EMAIL_OR_PHONE_ALREADY_REGISTERED: {
      ...ERROR_BODY,
      message: API_MSG.ERROR.EMAIL_OR_PHONE_ALREADY_REGISTERED,
    },
    EMAIL_VERIF_CODE_EMPTY: {
      ...ERROR_BODY,
      message: API_MSG.ERROR.EMAIL_VERIF_CODE_EMPTY,
    },
    EMAIL_VERIF_CODE_MISMATCH: {
      ...ERROR_BODY,
      message: API_MSG.ERROR.EMAIL_VERIF_CODE_MISMATCH,
    },
    EMAIL_ALREADY_VERIFIED: {
      ...ERROR_BODY,
      message: API_MSG.ERROR.EMAIL_ALREADY_VERIFIED,
    },
    FEATURE_IS_DISABLE: {
      ...ERROR_BODY,
      message: API_MSG.ERROR.EMAIL_ALREADY_VERIFIED,
    },
  },
  SUCCESS: {
    RETRIEVED_DATA_SUCCESS: {
      ...SUCCESS_BODY,
      message: API_MSG.SUCCESS.RETRIEVED_DATA_SUCCESS,
    },
    NEW_USER_CREATE: {
      ...SUCCESS_BODY,
      message: API_MSG.SUCCESS.NEW_USER_CREATE,
    },
    SIGN_IN_SUCCESS: {
      ...SUCCESS_BODY,
      message: API_MSG.SUCCESS.SIGN_IN_SUCCESS,
    },
    EMAIL_VERIF_SUCCESS: {
      ...SUCCESS_BODY,
      message: API_MSG.SUCCESS.EMAIL_VERIF_SUCCESS,
    },
  },
};

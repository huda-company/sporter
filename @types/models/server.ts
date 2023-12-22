type BASE_RESP = {
  success: boolean;
  message: string;
};

export type SuccessBodyType = {
  data: any;
  token?: string;
} & BASE_RESP;

export type ErrorBodyType = {
  error: any;
  token?: string;
} & BASE_RESP;

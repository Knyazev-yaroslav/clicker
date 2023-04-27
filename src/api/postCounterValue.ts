import axios from "axios";
import {
  IPostCounterValueError,
  IPostCounterValueOK,
  IPostCounterValueRequest,
  TResponse,
} from "./types";

export type TPostCounterValueResponse =
  | IPostCounterValueOK
  | IPostCounterValueError;

export const postCounterValue = (
  data: IPostCounterValueRequest
): TResponse<TPostCounterValueResponse> =>
  axios.request({
    baseURL: "https://lk.zont-online.ru/api/button_count",
    method: "POST",
    headers: { "X-ZONT-Client": "knyazev.yaroslav2020@gmail.com" },
    data: data,
  });

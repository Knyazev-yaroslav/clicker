import { AxiosResponse } from "axios";

export interface IPostCounterValueRequest {
  count: number;
}

export interface IPostCounterValueOK {
  count: number;
  ok: true;
}
export interface IPostCounterValueError {
  ok: false;
  error: string;
  error_ui: string;
}

export type TResponse<T> = Promise<AxiosResponse<T>>;

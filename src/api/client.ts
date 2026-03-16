import axios from "axios";
import { env } from "../env";

export const httpClient = axios.create({
  baseURL: env.BACKEND_URL,
  timeout: env.BACKEND_TIMEOUT,
});
import axios from "axios";
import { TGetQuestionResponse } from "./type";

export const GetDataQuestion = async (): Promise<TGetQuestionResponse> => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { data } = await axios.get(apiUrl);
  return data;
};

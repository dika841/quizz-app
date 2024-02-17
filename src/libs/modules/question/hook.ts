import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { GetDataQuestion } from "./api";
import { TGetQuestionResponse } from "./type";
import { TMetaErrorResponse } from "@libs/entities";

export const useDataQuestion = (): UseQueryResult<
  TGetQuestionResponse,
  TMetaErrorResponse
> => {
  return useQuery({
    queryKey: ["question"],
    queryFn: async () => await GetDataQuestion(),
  });
};

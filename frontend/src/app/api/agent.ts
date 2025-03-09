import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Routes";
import { ITag } from "../models/TagModel";
import { ICard } from "../models/CardModel";
import { IColumn } from "../models/ColumnModel";
import { IHistoryLog } from "../models/HistoryLogModel";
import { cardListResponse } from "./responses/card";
import { AddCardRequest, SwapCardsRequest } from "./requests/card";
import { AddTagRequest } from "./requests/tag";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.interceptors.response.use(
  async (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    const { data, status, config } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        if (
          config.method === "get" &&
          Object.prototype.hasOwnProperty.call(data.errors, "id")
        ) {
          router.navigate("/not-found");
        }
        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          throw modalStateErrors.flat();
        } else {
          toast.error(data);
        }
        break;
      case 401:
        toast.error("unauthorised");
        break;
      case 403:
        toast.error("forbidden");
        break;
      case 404:
        router.navigate("/not-found");
        break;
      case 500:
        router.navigate("/server-error");
        break;

      default:
        break;
    }
    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: object) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: object) =>
    axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Tags = {
  list: () => requests.get<ITag[]>("/tags"),
  details: (id: number) => requests.get<ITag>(`/tags/${id}`),
  create: (tag: AddTagRequest) => requests.post<ITag>("/tags", tag),
  update: (id: number, tag: ITag) => requests.put<ITag>(`/tags/${id}`, tag),
  delete: (id: number) => requests.delete<void>(`/tags/${id}`),
};

const Cards = {
  list: () => requests.get<cardListResponse[]>("/cards"),
  details: (id: number) => requests.get<ICard>(`/cards/${id}`),
  create: (card: AddCardRequest) => requests.post<ICard>("/cards", card),
  update: (id: number, card: ICard) =>
    requests.put<ICard>(`/cards/${id}`, card),
  delete: (id: number) => requests.delete<void>(`/cards/${id}`),
  swap: (swapData: SwapCardsRequest) =>
    requests.post<void>("/cards/swap", swapData),
};

const Columns = {
  list: () => requests.get<IColumn[]>("/columns"),
  details: (id: number) => requests.get<IColumn>(`/columns/${id}`),
  create: (column: IColumn) => requests.post<IColumn>("/columns", column),
  update: (id: number, column: IColumn) =>
    requests.put<IColumn>(`/columns/${id}`, column),
  delete: (id: number) => requests.delete<void>(`/columns/${id}`),
};

const HistoryLogs = {
  list: () => requests.get<IHistoryLog[]>("/historyLogs"),
  details: (id: number) => requests.get<IHistoryLog>(`/historyLogs/${id}`),
  create: (historyLog: IHistoryLog) =>
    requests.post<IHistoryLog>("/historyLogs", historyLog),
  update: (id: number, historyLog: IHistoryLog) =>
    requests.put<IHistoryLog>(`/historyLogs/${id}`, historyLog),
  delete: (id: number) => requests.delete<void>(`/historyLogs/${id}`),
};

export { Tags, Cards, Columns, HistoryLogs };

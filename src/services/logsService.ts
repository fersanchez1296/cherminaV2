import getApi from "@/lib/axios";

export interface LogEntry {
  Log: string;
  Username: string;
  Fecha_hora_log: { $date: string };
}

export interface LogItem {
  Tipo: string;
  Logs: LogEntry[];
}


export const getLogs = async (): Promise<LogItem[]> => {
  const api = await getApi();
  const response = await api.get(`logs/`);
  return response.data;
};

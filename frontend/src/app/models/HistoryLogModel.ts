export interface IHistoryLog {
  id: number;
  date: Date;
  message: string;
}

class HistoryLogModel implements IHistoryLog {
  id: number;
  date: Date;
  message: string;

  constructor({ id, date, message }: IHistoryLog) {
    this.id = id;
    this.date = date;
    this.message = message;
  }
}

export default HistoryLogModel;

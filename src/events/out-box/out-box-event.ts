export enum OutBoxEventEnum {
  PENDING = 'PENDING',
  PROCESSED = 'PROCESSED',
}

export interface OutBoxEvent {
  id: string;
  topic: string;
  payload: string;
  createdAt: Date;
  processedAt: Date | null;
  status: OutBoxEventEnum;
}

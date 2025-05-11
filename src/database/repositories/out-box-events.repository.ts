import { Injectable } from '@nestjs/common';
import { OutBoxEvent } from 'src/events/out-box/out-box-event';

export interface FindManyWithPendingStatusProps {
  readonly take: number;
  readonly order: 'asc' | 'desc';
}

@Injectable()
export abstract class OutBoxEventsRepository {
  abstract findManyWithPendingStatus: (
    props: FindManyWithPendingStatusProps,
  ) => Promise<OutBoxEvent[]>;
  abstract saveAsProcessed: (id: string) => Promise<void>;
}

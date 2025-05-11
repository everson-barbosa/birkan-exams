import { OutBoxEvent as PrismaOutBoxEvent } from '@prisma/client';
import { OutBoxEvent, OutBoxEventEnum } from 'src/events/out-box/out-box-event';

export class PrismaOutBoxEventMapper {
  static toDomain(outBoxEvent: PrismaOutBoxEvent): OutBoxEvent {
    return {
      id: outBoxEvent.id,
      topic: outBoxEvent.topic,
      payload: outBoxEvent.payload,
      createdAt: outBoxEvent.createdAt,
      processedAt: outBoxEvent.processedAt,
      status: OutBoxEventEnum[outBoxEvent.status],
    };
  }
}

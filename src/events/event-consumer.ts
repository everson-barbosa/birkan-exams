import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class EventConsumer<T = unknown> {
  abstract readonly event: string;
  abstract consume(payload: T): Promise<void>;
}

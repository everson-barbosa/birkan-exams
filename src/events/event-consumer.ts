import { Injectable } from '@nestjs/common';

export interface ConsumeProps {
  readonly topic: string;
  readonly groupId: string;
  readonly handler: any;
}

@Injectable()
export abstract class EventConsumer {
  abstract consume(props: ConsumeProps): Promise<void>;
}

import { Injectable } from '@nestjs/common';

export interface EmitProps {
  readonly topic: string;
  readonly payload: string;
}

@Injectable()
export abstract class EventProducer {
  abstract produce(props: EmitProps): Promise<void>;
}

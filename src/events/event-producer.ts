import { Injectable } from '@nestjs/common';

interface EmitProps {
  readonly event: string;
  readonly payload: unknown;
}

@Injectable()
export abstract class EventProducer {
  abstract emit(props: EmitProps): Promise<void>;
}

import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { EmitProps, EventProducer } from '../event-producer';
import { KafkaService } from './kafka.service';
import { Producer } from 'kafkajs';

@Injectable()
export class KafkaEventProducer
  implements EventProducer, OnModuleInit, OnModuleDestroy
{
  private producer: Producer;

  constructor(private kafkaService: KafkaService) {
    this.producer = this.kafkaService.getKafka().producer();
  }

  async onModuleInit() {
    try {
      this.producer = this.kafkaService.getKafka().producer();

      await this.producer.connect();
    } catch (error) {
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
  }

  async produce({ topic, payload }: EmitProps): Promise<void> {
    await this.producer.send({
      topic,
      messages: [{ value: payload }],
    });
  }
}

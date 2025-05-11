import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConsumeProps, EventConsumer } from '../event-consumer';
import { Consumer } from 'kafkajs';
import { KafkaService } from './kafka.service';

@Injectable()
export class KafkaEventConsumer implements EventConsumer, OnModuleDestroy {
  private consumer?: Consumer;

  constructor(private kafkaService: KafkaService) {}

  async onModuleDestroy() {
    if (this.consumer) await this.consumer.disconnect();
  }

  async consume({ topic, groupId, handler }: ConsumeProps) {
    this.consumer = this.kafkaService.getKafka().consumer({ groupId });

    await this.consumer.connect();
    await this.consumer.subscribe({ topic, fromBeginning: false });
    await this.consumer.run({ eachMessage: handler });
  }
}

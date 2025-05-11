import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ExamTemplateCreatedConsumer } from './consumers/exam-template-created.consumer';
import { EventConsumer } from './event-consumer';
import { KafkaEventConsumer } from './kafka/kafka-event-consumer';
import { KafkaService } from './kafka/kafka.service';
import { OutBoxEventDispatcherJob } from './out-box/out-box-event-dispatcher.job';
import { KafkaEventProducer } from './kafka/kafka-event-producer';
import { EventProducer } from './event-producer';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [DatabaseModule, ScheduleModule.forRoot()],
  providers: [
    KafkaService,
    OutBoxEventDispatcherJob,
    ExamTemplateCreatedConsumer,
    {
      useClass: KafkaEventConsumer,
      provide: EventConsumer,
    },
    {
      useClass: KafkaEventProducer,
      provide: EventProducer,
    },
  ],
})
export class EventModule {}

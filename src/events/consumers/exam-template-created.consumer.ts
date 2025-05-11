import { Injectable } from '@nestjs/common';
import { EventConsumer } from '../event-consumer';

@Injectable()
export class ExamTemplateCreatedConsumer {
  constructor(private eventConsumer: EventConsumer) {
    this.handle();
  }

  async handle() {
    this.eventConsumer.consume({
      topic: 'exams.exam-template.created.v1',
      groupId: 'birkan-exam-api',
      handler: (message) => {
        console.log({
          message,
          logger: ExamTemplateCreatedConsumer.name,
        });
      },
    });
  }
}

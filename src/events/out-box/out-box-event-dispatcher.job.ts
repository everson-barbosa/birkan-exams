import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { EventProducer } from '../event-producer';
import { OutBoxEventsRepository } from 'src/database/repositories/out-box-events.repository';

const EVERY_5_SECONDS = '*/5 * * * * *';

@Injectable()
export class OutBoxEventDispatcherJob {
  private readonly logger = new Logger(OutBoxEventDispatcherJob.name);

  constructor(
    private outBoxEventsRepository: OutBoxEventsRepository,
    private eventProducer: EventProducer,
  ) {}

  @Cron(EVERY_5_SECONDS)
  async handle() {
    const pendingEvents =
      await this.outBoxEventsRepository.findManyWithPendingStatus({
        order: 'asc',
        take: 50,
      });

    for (const event of pendingEvents) {
      try {
        await this.eventProducer.produce(event);

        await this.outBoxEventsRepository.saveAsProcessed(event.id);
      } catch (error) {
        this.logger.error(`Erro ao processar evento ${event.id}`, error);
      }
    }
  }
}

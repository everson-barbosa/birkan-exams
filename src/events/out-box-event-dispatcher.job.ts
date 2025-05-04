import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class OutBoxEventDispatcherJob {
  private readonly logger = new Logger(OutBoxEventDispatcherJob.name);

  constructor(private prismaService: PrismaService) {
    this.handle();
  }

  async handle() {
    const pendingEvents = await this.prismaService.outBoxEvent.findMany({
      where: {
        status: 'PENDING',
      },
      take: 100,
      orderBy: {
        createdAt: 'asc',
      },
    });

    for (const event of pendingEvents) {
      try {
        await this.prismaService.outBoxEvent.update({
          where: { id: event.id },
          data: {
            processedAt: new Date(),
            status: 'PROCESSED',
          },
        });

        // Tenho que criar a implementação do producer, vou usar o Kafka
      } catch (error) {
        this.logger.error(`Erro ao processar evento ${event.id}`, error);
      }
    }
  }
}

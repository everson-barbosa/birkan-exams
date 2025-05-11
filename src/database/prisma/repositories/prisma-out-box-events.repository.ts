import {
  FindManyWithPendingStatusProps,
  OutBoxEventsRepository,
} from 'src/database/repositories/out-box-events.repository';
import { PrismaService } from '../prisma.service';
import { PrismaOutBoxEventMapper } from '../mappers/prisma-out-box-event.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaOutBoxEventsRepository implements OutBoxEventsRepository {
  constructor(private prismaService: PrismaService) {}

  async findManyWithPendingStatus({
    take,
    order,
  }: FindManyWithPendingStatusProps) {
    const pendingEvents = await this.prismaService.outBoxEvent.findMany({
      take,
      where: {
        status: 'PENDING',
      },
      orderBy: {
        createdAt: order,
      },
    });

    return pendingEvents.map(PrismaOutBoxEventMapper.toDomain);
  }

  async saveAsProcessed(id: string) {
    await this.prismaService.outBoxEvent.update({
      where: {
        id,
      },
      data: {
        status: 'PROCESSED',
        processedAt: new Date(),
      },
    });
  }
}

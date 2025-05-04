import { Module } from '@nestjs/common';
import { OutBoxEventDispatcherJob } from './out-box-event-dispatcher.job';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [OutBoxEventDispatcherJob],
})
export class EventModule {}

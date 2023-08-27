import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomResolver } from './room.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './room.entity';
import { ChatsModule } from 'src/chats/chats.module';

@Module({
  imports:[TypeOrmModule.forFeature([Room]),ChatsModule],
  providers: [RoomService, RoomResolver]
})
export class RoomModule {}

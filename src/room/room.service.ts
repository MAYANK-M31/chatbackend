import { Injectable } from '@nestjs/common';
import { Room } from './room.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createRoomInput } from './dto/create-room.input';
import { Chat } from 'src/chats/entities/chat.entity';
import { ChatsService } from 'src/chats/chats.service';

@Injectable()
export class RoomService {

  constructor(
    @InjectRepository(Room) private roomRepository: Repository<Room>,  private chatService: ChatsService
  ) {}

  createRoom(): Promise<Room>{
    const newRoom = this.roomRepository.create();
    return this.roomRepository.save(newRoom);
  }

  async findAll(): Promise<Room[]> {
    return this.roomRepository.find();
  }

  async findChatsByRoom(chatRoomId:number): Promise<Chat[]> {
    console.log(chatRoomId);
    
    return this.chatService.findAll(chatRoomId);
  }
}

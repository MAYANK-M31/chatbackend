import { Injectable } from '@nestjs/common';
import { CreateChatInput } from './dto/create-chat.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { Repository, FindManyOptions } from 'typeorm';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
  ) {}

  create(createChatInput: CreateChatInput): Promise<Chat> {
    const newRoom = this.chatRepository.create(createChatInput);
    return this.chatRepository.save(newRoom);
  }

  findAll(chatRoomId: number): Promise<Chat[]> {    
    const findOptions: FindManyOptions<Chat> = {
      where: {
        chatRoomId: chatRoomId, // Assuming 'chatRoomId' is the property name in the Chat entity
      },
      order: {
        createdAt: 'ASC', // Sort in ascending order based on 'createdAt'
      },
    };

    return this.chatRepository.find(findOptions);
  }
  

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}

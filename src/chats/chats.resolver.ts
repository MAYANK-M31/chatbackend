import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { ChatsService } from './chats.service';
import { Chat } from './entities/chat.entity';
import { CreateChatInput } from './dto/create-chat.input';
import { UpdateChatInput } from './dto/update-chat.input';

const pubSub = new PubSub();
@Resolver(() => Chat)
export class ChatsResolver {
  constructor(private readonly chatsService: ChatsService) {}

  // Implement subscription for new chat messages
  @Subscription(() => Chat, {
    filter: (payload, variables) => {
      return payload.newChatMessage.chatRoomId === variables.chatRoomId; // Corrected usage
    },
  })
  
  newChatMessage(@Args('chatRoomId', { type: () => Int }) chatRoomId: number) {
    console.log(`Client subscribed to chat room ${chatRoomId}`);
    return pubSub.asyncIterator('NEW_CHAT_MESSAGE');
  }

  @Mutation(() => Chat)
  async createChat(@Args('createChatInput') createChatInput: CreateChatInput) {
    const chat = await this.chatsService.create(createChatInput);

    // IMPORTANT: Clone the chat object to avoid potential modification issues
    const clonedChat = Object.assign({}, chat);
    // Publish the new chat message event
    pubSub.publish('NEW_CHAT_MESSAGE', { newChatMessage: clonedChat });

    return chat;
  }

  @Query(() => [Chat])
  chats(@Args('id', { type: () => Int }) id: number) {
    return this.chatsService.findAll(id);
  }

  @Query(() => Chat, { name: 'chat' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.chatsService.findOne(id);
  }

  @Mutation(() => Chat)
  removeChat(@Args('id', { type: () => Int }) id: number) {
    return this.chatsService.remove(id);
  }
}

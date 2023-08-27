import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { RoomService } from './room.service';
import { Room } from './room.entity';
import { createRoomInput } from './dto/create-room.input';
import { Chat } from 'src/chats/entities/chat.entity';

@Resolver(of => Room)
export class RoomResolver {
    constructor(private roomService: RoomService){}

    @Query(returns => [Room])
    rooms(): Promise<Room[]>{
        return this.roomService.findAll();
    }

    @ResolveField(returns => [Chat])
    chats(@Parent() room: Room ):Promise<Chat[]>{
        return this.roomService.findChatsByRoom(room?.id);
    }

    @Mutation(returns => Room)
    createRoom(@Args('createRoomInput') createRoomInput: createRoomInput): Promise<Room>{
        return this.roomService.createRoom()
    }


}

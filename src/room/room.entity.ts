import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Chat } from 'src/chats/entities/chat.entity';
import { Entity, PrimaryGeneratedColumn,OneToMany } from 'typeorm';

@Entity()
@ObjectType()
export class Room {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @OneToMany(()=> Chat, chat => chat.chatRoomId)
  @Field(type => [Chat],{nullable:true})
  messages?:Chat[]


}

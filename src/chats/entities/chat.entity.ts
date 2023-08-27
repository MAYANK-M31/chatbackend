import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn,Column,CreateDateColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Chat {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  message: string

  @Column({ type: 'integer' }) // Add the chatRoomId column here
  @Field((type) => Int) // Specify the GraphQL type for chatRoomId
  chatRoomId: number;

  @Column({ type: 'boolean', default: false })
  @Field()
  user: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  @Field()
  createdAt: Date;


}

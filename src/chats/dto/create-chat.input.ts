import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateChatInput {
  @Field()
  message: string;

  @Field((type) => Int) // Specify the GraphQL type for chatRoomId
  chatRoomId: number;

  @Field()
  user: boolean;
}

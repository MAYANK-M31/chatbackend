import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class createRoomInput {
    @Field({ nullable: true })
    id?: boolean;
}
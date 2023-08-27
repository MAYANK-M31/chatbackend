import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { RoomModule } from './room/room.module';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatsModule } from './chats/chats.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(),'src/schema.gql'),
      subscriptions: {
        'subscriptions-transport-ws': {
          path: '/graphql'
        },
      }
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgres://mayank31m:REwU4bKJ1Ajk@ep-bold-shadow-09058251.ap-southeast-1.aws.neon.tech/neondb',
      entities: [__dirname + '/../**/*.entity.ts'],
      synchronize: true, // Only use synchronize in development,
      ssl: {
        rejectUnauthorized: false, // Accept self-signed certificates (not recommended for production)
      },
    }),
    RoomModule,
    ChatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

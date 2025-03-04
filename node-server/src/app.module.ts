import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { appConstants } from './constants';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    MongooseModule.forRoot(appConstants.mongooseConnectionUrl),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

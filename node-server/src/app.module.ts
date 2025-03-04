import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { appConstants } from './constants';
import { ApplicationsModule } from './applications/applications.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    MongooseModule.forRoot(appConstants.mongooseConnectionUrl),
    ApplicationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

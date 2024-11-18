import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './entity/user.entity';
import { StudentModel, TeacherModel } from './entity/person.entity';
import {
  AirplaneModel,
  BookModel,
  CarModel,
  ComputerModel,
  SingleBaseModel,
} from './entity/inheritance.entity';
import { ProfileModel } from './entity/profile.entity';
import { PostModel } from './entity/post.entity';
import { TagModel } from './entity/tag.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'typeorm_study',
      entities: [
        UserModel,
        StudentModel,
        TeacherModel,
        BookModel,
        CarModel,
        ComputerModel,
        AirplaneModel,
        SingleBaseModel,
        ProfileModel,
        PostModel,
        TagModel,
      ],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([
      UserModel,
      StudentModel,
      TeacherModel,
      BookModel,
      CarModel,
      ProfileModel,
      PostModel,
      TagModel,
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

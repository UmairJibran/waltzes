import { Injectable } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Application } from './schemas/application.schema';
import { Model } from 'mongoose';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectModel(Application.name) private applications: Model<Application>,
  ) {}

  create(createApplicationDto: CreateApplicationDto, user: string) {
    return this.applications.create({ ...createApplicationDto, user });
  }

  findAll(user: string) {
    return this.applications.find({ user, deletedAt: null });
  }

  findOne(id: string, user: string) {
    return this.applications.findOne({ _id: id, user, deletedAt: null });
  }

  update(id: string, user: string, updateApplicationDto: UpdateApplicationDto) {
    return this.applications.findOneAndUpdate(
      { _id: id, user, deletedAt: null },
      updateApplicationDto,
      { new: true },
    );
  }

  remove(id: string, user: string) {
    return this.applications.findOneAndUpdate(
      { _id: id, user, deletedAt: null },
      { deletedAt: new Date() },
      { new: true },
    );
  }
}

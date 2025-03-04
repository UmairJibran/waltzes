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

  async create(createApplicationDto: CreateApplicationDto, user: string) {
    const app = await this.applications.create({
      ...createApplicationDto,
      user,
    });
    return app;
  }

  async findAll(
    user: string,
    {
      status,
    }: { status: 'applied' | 'interviewing' | 'rejected' | 'accepted' },
  ) {
    const applications = await this.applications.find({
      user,
      deletedAt: null,
      ...(status && { applicationStatus: status }),
    });
    return {
      data: applications,
    };
  }

  async findOne(id: string, user: string) {
    const app = await this.applications.findOne({
      _id: id,
      user,
      deletedAt: null,
    });
    return app;
  }

  async update(
    id: string,
    user: string,
    updateApplicationDto: UpdateApplicationDto,
  ) {
    const app = await this.applications.findOneAndUpdate(
      { _id: id, user, deletedAt: null },
      updateApplicationDto,
      { new: true },
    );
    return app;
  }

  async remove(id: string, user: string) {
    const app = await this.applications.findOneAndUpdate(
      { _id: id, user, deletedAt: null },
      { deletedAt: new Date() },
      { new: true },
    );
    return app;
  }
}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type JobDocument = HydratedDocument<Job>;

@Schema({
  timestamps: true,
})
export class Job {
  @Prop({
    required: true,
    default: '---',
  })
  title: string;

  @Prop({
    required: true,
    default: '---',
  })
  companyName: string;

  @Prop()
  description?: string;

  @Prop()
  skills?: string[];

  @Prop()
  url?: string;

  @Prop()
  location?: string;

  @Prop()
  salary?: string;

  @Prop()
  status: 'enqueue' | 'scraping' | 'done' | 'error';

  @Prop()
  notes?: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const JobSchema = SchemaFactory.createForClass(Job);

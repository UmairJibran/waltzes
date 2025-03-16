import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type ApplicationDocument = HydratedDocument<Application>;

@Schema({
  timestamps: true,
})
export class Application {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  user: MongooseSchema.Types.ObjectId;

  @Prop({
    default: 'applied',
  })
  applicationStatus: 'applied' | 'interviewing' | 'rejected' | 'accepted';

  @Prop({ type: MongooseSchema.Types.Mixed })
  appliedWith: {
    resume?: string;
    coverLetter?: string;
  };

  @Prop({ type: MongooseSchema.Types.Mixed })
  resumeRaw: Record<string, any>;

  @Prop({ type: MongooseSchema.Types.Mixed })
  coverLetterRaw: Record<string, any>;

  @Prop()
  resumeStarted: boolean;

  @Prop()
  coverLetterStarted: boolean;

  @Prop({ default: false })
  jobScrapingStarted: boolean;

  @Prop()
  jobUrl: string;

  @Prop()
  notes: string;

  @Prop()
  resumeStatus: 'enqueued' | 'processing' | 'completed' | 'failed';

  @Prop()
  coverLetterStatus: 'enqueued' | 'processing' | 'completed' | 'failed';

  @Prop()
  resumeProgress: number;

  @Prop()
  coverLetterProgress: number;

  @Prop({
    default: false,
  })
  generateResume: boolean;

  @Prop({
    default: false,
  })
  generateCoverLetter: boolean;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Job',
    required: false,
  })
  job: MongooseSchema.Types.ObjectId;

  @Prop({
    default: () => new Date(),
  })
  appliedAt: Date;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  deletedAt: Date;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);

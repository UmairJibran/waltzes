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
    required: true,
  })
  jobTitle: string;

  @Prop({
    required: true,
  })
  companyName: string;

  @Prop({
    default: 'applied',
  })
  applicationStatus: 'applied' | 'interviewing' | 'rejected' | 'accepted';

  @Prop({ type: MongooseSchema.Types.Mixed })
  appliedWith: {
    resume?: string;
    coverLetter?: string;
  };

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

  //   @Prop({
  //     type: MongooseSchema.Types.ObjectId,
  //     ref: 'JobDetails',
  //     required: false,
  //   })
  //   jobDetails: MongooseSchema.Types.ObjectId;
  @Prop({
    default: false,
  })
  generateResume: boolean;

  @Prop({
    default: false,
  })
  generateCoverLetter: boolean;


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

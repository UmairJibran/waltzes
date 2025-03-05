import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

const defaultLinkedinProfileData = {
  linkedin_data_raw: {
    first_name: '',
    last_name: '',
    full_name: '',
    occupation: '',
    headline: '',
    location: '',
    about: '',
    country: '',
    country_full_name: '',
    city: '',
    state: '',
    skills: [],
    experience: [],
    education: [],
    languages_and_proficiencies: [],
    accomplishment_organisations: [],
    accomplishment_publications: [],
    accomplishment_honors_awards: [],
    accomplishment_courses: [],
    accomplishment_patents: [],
    accomplishment_projects: [],
    accomplishment_test_scores: [],
    volunteer_work: [],
    recommendations: [],
    certifications: [],
    activities: [],
    articles: [],
    industry: '',
    extra: '',
    interests: [],
  },
};

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({
    immutable: true,
    unique: true,
    lowercase: true,
    required: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    index: true,
    trim: true,
  })
  email: string;

  @Prop()
  phone?: string;

  @Prop({ lowercase: true, trim: true })
  portfolioUrl?: string;

  @Prop({ lowercase: true, trim: true })
  linkedinUsername?: string;

  @Prop({ lowercase: true, trim: true })
  githubUsername?: string;

  @Prop()
  additionalInstructions?: string;

  @Prop()
  password: string;

  @Prop()
  role: 'admin' | 'user';

  @Prop({
    type: MongooseSchema.Types.Mixed,
    default: defaultLinkedinProfileData,
  })
  linkedinScrapedData?: Record<string, any>;

  @Prop({ type: MongooseSchema.Types.Mixed })
  githubScrapedData?: Record<string, any>;

  @Prop({ type: MongooseSchema.Types.Mixed })
  portfolioScrapedData?: Record<string, any>;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  if (this.isModified('linkedinUsername')) {
    this.linkedinScrapedData = defaultLinkedinProfileData;
    // await 
  } else if (this.isNew) {
    this.linkedinScrapedData = defaultLinkedinProfileData;
    // await 
  }

  next();
});

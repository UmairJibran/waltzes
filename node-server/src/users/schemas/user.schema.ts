import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

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

  @Prop({
    unique: true,
  })
  phone?: string;

  @Prop({ unique: true, lowercase: true, trim: true })
  portfolioUrl?: string;

  @Prop({ unique: true, lowercase: true, trim: true })
  linkedinUsername?: string;

  @Prop({ unique: true, lowercase: true, trim: true })
  githubUsername?: string;

  @Prop()
  additionalInstructions?: string;

  @Prop()
  password: string;

  @Prop()
  role: 'admin' | 'user';

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

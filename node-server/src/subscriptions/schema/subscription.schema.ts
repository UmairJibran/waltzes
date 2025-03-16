import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SubscriptionDocument = HydratedDocument<Subscription>;

@Schema({
  timestamps: true,
})
export class Subscription {
  @Prop({
    required: true,
    unique: true,
  })
  eventId: string;

  @Prop({
    required: true,
    index: true,
  })
  subscriptionId: string;

  @Prop({
    required: true,
    index: true,
  })
  customerId: string;

  @Prop({
    immutable: true,
    lowercase: true,
    required: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    index: true,
    trim: true,
  })
  email: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({
    required: true,
    enum: ['active', 'cancelled', 'non_renewing', 'paused', 'pending'],
  })
  status: string;

  @Prop({ required: true })
  billingPeriod: number;

  @Prop({ required: true })
  billingPeriodUnit: string;

  @Prop({ required: true })
  currencyCode: string;

  @Prop()
  currentTermStart: Date;

  @Prop()
  currentTermEnd: Date;

  @Prop()
  nextBillingAt: Date;

  @Prop()
  startedAt: Date;

  @Prop()
  activatedAt: Date;

  @Prop({
    type: [
      {
        type: {
          itemPriceId: String,
          itemType: String,
          meteredQuantity: String,
          unitPrice: Number,
          freeQuantity: Number,
          _id: false,
        },
      },
    ],
  })
  subscriptionItems: Array<{
    itemPriceId: string;
    itemType: string;
    meteredQuantity: string;
    unitPrice: number;
    freeQuantity: number;
  }>;

  @Prop({
    type: {
      firstName: String,
      lastName: String,
      line1: String,
      line2: String,
      city: String,
      state: String,
      country: String,
      zip: String,
      _id: false,
    },
  })
  billingAddress: {
    firstName: string;
    lastName: string;
    line1: string;
    line2: string;
    city: string;
    state: string;
    country: string;
    zip: string;
  };

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);

class SubscriptionItemDto {
  item_price_id: string;
  item_type: string;
  metered_quantity: string;
  unit_price: number;
  free_quantity: number;
  object: string;
}

class BillingAddressDto {
  first_name?: string;
  last_name?: string;
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  country?: string;
  zip?: string;
  validation_status?: string;
  object?: string;
}

class CreateWebhookDto {
  webhookId: string;
  webhook_status: string;
  object: string;
}

export class CreateSubscriptionDto {
  id: string;
  customer_id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  status: 'active' | 'cancelled' | 'non_renewing' | 'paused' | 'pending';
  billing_period: number;
  billing_period_unit: string;
  currencyCode: string;
  current_term_start?: number;
  current_term_end?: number;
  next_billing_at?: number;
  created_at?: number;
  updated_at?: number;
  started_at?: number;
  activated_at?: number;
  created_from_ip?: string;
  has_scheduled_changes: boolean;
  channel: string;
  resource_version: number;
  deleted: boolean;
  object: string;
  currency_code: string;
  due_invoices_count: number;
  mrr: number;
  has_scheduled_advance_invoices: boolean;
  create_pending_invoices: boolean;
  auto_close_invoices: boolean;
  subscription_items?: SubscriptionItemDto[];
  shipping_address?: BillingAddressDto;
}

class PaymentMethodDto {
  object: string;
  type: string;
  reference_id: string;
  gateway: string;
  gateway_account_id: string;
  status: string;
}

class CreateCustomerDto {
  billing_address: BillingAddressDto;
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  auto_collection: string;
  net_term_days: number;
  allow_direct_debit: boolean;
  created_at: number;
  created_from_ip: string;
  taxability: string;
  updated_at: number;
  pii_cleared: string;
  channel: string;
  resource_version: number;
  deleted: boolean;
  object: string;
  card_status: string;
  promotional_credits: number;
  refundable_credits: number;
  excess_payments: number;
  unbilled_charges: number;
  preferred_currency_code: string;
  mrr: number;
  primary_payment_source_id: string;
  auto_close_invoices: boolean;
  payment_method: PaymentMethodDto;
}

class CreationEventContentDto {
  subscription: CreateSubscriptionDto;
  customer: CreateCustomerDto;
}

export class CreationEventDto {
  id: string;
  occurred_at: number;
  source: string;
  object: string;
  content: CreationEventContentDto;
  api_version: string;
  event_type: string;
  webhook_status: string;
  webhooks: CreateWebhookDto[];
}

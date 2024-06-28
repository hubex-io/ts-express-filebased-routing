type SubscriptionType =
  | "conversation.creation"
  | "conversation.newMessage"
  | "conversation.propertyChange"
  | "contact.propertyChange"
  | "deal.propertyChange";

export type HubSpotWebhookResponse = {
  eventId: number;
  subscriptionId: number;
  portalId: number;
  appId: number;
  occurredAt: number;
  subscriptionType: SubscriptionType;
  attemptNumber: number;
  objectId: number;
  propertyName: string;
  propertyValue: string;
  changeSource: string;
  sourceId: string;
  changeFlag?: string;
};

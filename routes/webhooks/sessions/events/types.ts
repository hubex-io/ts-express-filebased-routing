export interface SessionEventPublishedWebhook {
  trigger: "EVENT_PUBLISHED" | "EVENT_UPDATED";
  data: {
    session: Session;
  };
}

interface Session {
  id: string;
  name: string;
  description: string | null;
  quickSession: boolean;
  room: string | null;
  createdAt: string;
  startAt: string;
  actualStart: string | null;
  plannedEnd: string;
  endedAt: string | null;
  reminders: unknown[];
  messageReminders: unknown[];
  booking: unknown;
  event: {
    id: string;
    slug: string;
    state: string;
  };
  participants: [
    {
      id: string;
      isOwner: true;
      guest: unknown;
      user: unknown;
    }
  ];
}

export interface HubSpotMarketingEventResponse {
  status: "COMPLETE";
  results: HubSpotMarketingEventResponseResult[];
  startedAt: string; // ISO 8601 date-time format
  completedAt: string; // ISO 8601 date-time format
}

export interface HubSpotMarketingEventResponseResult {
  eventName: string;
  eventType: "WEBINAR" | string; // Allow for other event types
  startDateTime: string; // ISO 8601 date-time format
  endDateTime: string; // ISO 8601 date-time format
  eventOrganizer: string;
  eventDescription: string; // Assuming description is parsed from JSON
  eventUrl: string | null;
  eventCancelled: boolean;
  eventCompleted: boolean;
  customProperties: any[]; // Assuming unknown structure for customProperties
  id: string;
  createdAt: string; // ISO 8601 date-time format
  updatedAt: string; // ISO 8601 date-time format
}

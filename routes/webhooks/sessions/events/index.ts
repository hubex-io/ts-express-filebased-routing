import { Request, Response } from "express";
import type { SessionEventPublishedWebhook, HubSpotMarketingEventResponse } from "./types";

export const post = async (req: Request, res: Response) => {
  const hook: SessionEventPublishedWebhook = req.body;

  try {
    const response = await fetch("https://api.hubapi.com/marketing/v3/marketing-events/events/upsert", {
      method: "post",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.HUBSPOT_PRIVATE_TOKEN}`,
      },
      body: JSON.stringify({
        inputs: [
          {
            customProperties: [
              {
                name: "sessions_id",
                value: hook.data.session.id,
              },
              {
                name: "status",
                value: hook.data.session.endedAt ? "Ended" : "Upcoming",
              },
            ],
            eventName: hook.data.session.name,
            eventType: "WEBINAR",
            startDateTime: hook.data.session.startAt,
            endDateTime: hook.data.session.plannedEnd,
            eventOrganizer: "Hubex",
            eventCancelled: false,
            externalAccountId: "Hubex",
            externalEventId: hook.data.session.id,
            eventUrl: `https://event.sessions.hubex.io/${hook.data.session.event.slug}`,
          },
        ],
      }),
    });
    const marketingEventResponse: HubSpotMarketingEventResponse = await response.json();

    if (marketingEventResponse.status === "COMPLETE") {
      res.status(201).json({ message: "Marketing Event created" });
    } else {
      throw Error("The marketing event could not be created...");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Marketing Event could not be created..." });
  }
};

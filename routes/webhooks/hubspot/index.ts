import { roam } from "$lib/clients/roam";
import { hubspot } from "$lib/clients/hubspot";
import type { HubSpotWebhookResponse } from "./types";
import { Request, Response } from "express";

export const POST = async (req: Request, res: Response) => {
  const hooks: HubSpotWebhookResponse[] = await req.body;

  hooks.forEach(async (hook) => {
    // if a contact becomes marketing qualified
    if (
      hook.subscriptionType === "contact.propertyChange" &&
      hook.propertyName === "lifecyclestage" &&
      hook.propertyValue === "marketingqualifiedlead"
    ) {
      const contact = await hubspot.crm.contacts.basicApi.getById(JSON.stringify(hook.objectId));

      await roam.notify({
        message: `${contact.properties.firstname} ${contact.properties.lastname} just became a MQL🔥\n\n[View record in HubSpot](https://app.hubspot.com/contacts/${hook.portalId}/record/0-1/${contact.id})`,
        channel: "dev",
        identity: "hubspot",
      });
      return;
    }

    // // if a deal is closed
    // if (
    //   hook.subscriptionType === "deal.propertyChange" &&
    //   hook.propertyName === "dealstage" &&
    //   hook.propertyValue === "closedwon"
    // ) {
    //   const deal = await hubspot.getDealById(hook.objectId);

    //   await roam.notify({
    //     message: `DING🎉🎉🎉 - ${deal.properties.dealname} just closed!`,
    //     channel: "notifications",
    //     identity: "hubspot",
    //   });
    //   return;
    // }

    // new conversation in the inbox
    if (hook.subscriptionType === "conversation.creation") {
      await roam.notify({
        message: `💬 New Inbox Conversation! \n\n[Reply in Inbox](https://app.hubspot.com/live-messages/${hook.portalId}/inbox/${hook.objectId})`,
        channel: "inbox",
        identity: "hubspot",
      });
    }

    // // new message
    // if (hook.subscriptionType === 'conversation.propertyChange') {
    // 	const conversation = await hubspot.getConversationById(hook.objectId);

    // 	await roam.notify({
    // 		message: `A conversation was reopened \n\n[View in Inbox](https://app.hubspot.com/live-messages/${
    // 			hook.portalId
    // 		}/inbox/${hook.objectId}) \n\n Hook: ${JSON.stringify(hook)} \n\n Convo: ${JSON.stringify(
    // 			conversation
    // 		)}`,
    // 		channel: 'dev',
    // 		identity: 'hubspot'
    // 	});
    // }
  });

  res.json({
    status: 201,
    message: "Notification sent",
  });
};

import { roam } from "$lib/clients/roam";

import { Request, Response } from "express";
import { BonusCreatedEvent } from "./types";

export const POST = async (req: Request, res: Response) => {
  const hook: BonusCreatedEvent = req.body;

  if (hook.event_type === "bonus.created") {
    await roam.notify({
      message: `**${hook.data.giver.display_name}**: ${hook.data.reason} \n\n [View in Bonus.ly](https://bonus.ly/bonuses/${hook.data.id})`,
      channel: "notifications",
      identity: "bonusly",
    });

    res.status(201).json({ response: "Roam message sent" });
  } else {
    res.status(403).json({ message: "Bad request. No actions implemented for this subscription" });
  }
};

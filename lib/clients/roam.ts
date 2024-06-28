type RoamNotifyConfig = {
  api_key?: string;
  message: string;
  channel?: "notifications" | "happy" | "inbox" | "dev";
  identity?: "hubspot" | "bonusly" | "brreg" | "community";
};

export const roam = {
  /**
    @type {RoamNotifyConfig}
    @param ctx Configuration object
    @description Sends a message to the HubSpot Notifications channel in Roam
  */

  async notify(ctx: RoamNotifyConfig) {
    let channelId: string;
    let senderName: string;
    let senderLogo: string;

    switch (ctx.channel) {
      case "notifications":
        channelId = "fe2e3f8a-788f-4957-9864-1be4dae1159d";
        break;
      case "inbox":
        channelId = "212fd5ea-0889-4ec7-a7ca-c02f2637dc84";
        break;
      case "dev":
        channelId = "46b7a2a6-3209-48ac-874a-a1277d86f213";
        break;
      default:
        channelId = "46b7a2a6-3209-48ac-874a-a1277d86f213";
        break;
    }

    switch (ctx.identity) {
      case "hubspot":
        senderName = "HubSpot";
        senderLogo = "https://api.hubex.io/hubspot-icon.png";
        break;
      case "bonusly":
        senderName = "Bonus.ly";
        senderLogo = "https://api.hubex.io/bonusly-icon.png";
        break;
      case "brreg":
        senderName = "Brønnøysundregistrene";
        senderLogo = "https://api.hubex.io/brreg-icon.jpg";
        break;
      case "community":
        senderName = "SaaS RevOps Community";
        senderLogo = "https://api.hubex.io/hubex-icon.jpg";
      default:
        senderName = "API";
        senderLogo = "https://api.hubex.io/hubex-icon.jpg";
        break;
    }

    try {
      const response = await fetch("https://api.ro.am/v1/chat.sendMessage", {
        method: "post",
        headers: { Authorization: `Bearer ${process.env.ROAM_API_KEY}` },
        body: JSON.stringify({
          recipients: [channelId],
          text: ctx.message,
          sender: {
            id: ctx.identity,
            name: senderName,
            imageUrl: senderLogo,
          },
        }),
      });

      const reply = response.json();
      return reply;
    } catch (error) {
      throw new Error("Could not send roam message");
    }
  },
};

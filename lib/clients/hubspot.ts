import { Client } from "@hubspot/api-client";
export const hubspot = new Client({ accessToken: process.env.HUBSPOT_PRIVATE_TOKEN as string });

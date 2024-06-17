import type { Request, Response } from "express";

export const get = async (req: Request, res: Response) => {
  return res.json({ status: "🚀" });
};

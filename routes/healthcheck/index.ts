import type { Request, Response } from "express";

export const get = (req: Request, res: Response) => {
  res.json({ message: "The API is running.. " });
};

import { Document } from "mongoose";

export interface IRoleDocument extends Document {
  level: number;
  roleName: string;
  description: string;
  isActive: boolean;
}

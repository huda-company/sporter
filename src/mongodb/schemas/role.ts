import mongoose, { Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";

import { IRoleDocument } from "^/@types/models/role";

type SchemaTypes = IRoleDocument & mongoose.PaginateModel<IRoleDocument>;

export const RoleSchema = new Schema<IRoleDocument>(
  {
    level: {
      type: Number,
      required: true,
    },
    roleName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true, getters: true },
  }
);

RoleSchema.plugin(paginate);

const Role =
  (mongoose.models?.Role as SchemaTypes) ??
  mongoose.model<IRoleDocument, mongoose.PaginateModel<IRoleDocument>>(
    "Role",
    RoleSchema
  );

export default Role;

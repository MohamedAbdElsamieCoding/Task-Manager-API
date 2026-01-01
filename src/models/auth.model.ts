import { Schema, model } from "mongoose";
import { IAuth } from "../types/auth";
import bcrypt from "bcrypt";

const authSchema = new Schema<IAuth>(
  {
    name: String,
    email: String,
    password: String,
  },
  { timestamps: true }
);

authSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
  } catch (error) {
    throw error;
  }
});

authSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

export const Auth = model<IAuth>("Auth", authSchema);

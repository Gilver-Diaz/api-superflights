import { Schema } from '@nestjs/mongoose';
import { IsEmail } from 'class-validator';
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    name: { type: String, requered: true },
    username: { type: String, requered: true },
    email: { type: String, requered: true },
    password: { type: String, requered: true },
  },
  { timestamps: true },
);

UserSchema.index({ usersname: 1 }, { unique: true });
UserSchema.index({ email: 1 }, { unique: true });

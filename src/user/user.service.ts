import { Injectable } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';

import { IUser } from 'src/common/interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { promises } from 'dns';
import { InjectModel } from '@nestjs/mongoose';
import { USER } from 'src/common/models/models';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(USER.name) private readonly model: Model<IUser>) {}
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
  async create(UserDTO: UserDTO): Promise<IUser> {
    const hash = await this.hashPassword(UserDTO.password);
    const nweUser = new this.model({ ...UserDTO, password: hash });
    return await nweUser.save();
  }
}

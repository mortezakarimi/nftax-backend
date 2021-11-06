import { Injectable, NotFoundException } from '@nestjs/common';
import { User, UserDocument } from './schemas/User.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOneByWalletAddress(
    walletAddress: string,
  ): Promise<User | undefined> {
    return this.userModel.findOne({ walletAddress }).exec();
  }

  async findById(id: string): Promise<User | undefined> {
    return this.userModel.findById(id, { nonce: false }).exec();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async updateNonce(id: string): Promise<User> {
    const updatedUser = this.userModel.findByIdAndUpdate(
      id,
      { nonce: Math.floor(Math.random() * 1000000).toString() },
      { new: true },
    );
    if (!updatedUser) {
      throw new NotFoundException();
    }
    return updatedUser;
  }
}

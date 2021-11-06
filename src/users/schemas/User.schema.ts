import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @ApiProperty({
    description: 'User Ethereum wallet address',
    example: '0x03Cda2965b389A193AD9Fd50973Cc1C1Eb557A8a',
  })
  @Prop({ unique: true })
  walletAddress: string;

  @ApiProperty({
    description: 'User account noun',
    example: '2288732',
  })
  @Prop({ default: () => Math.floor(Math.random() * 1000000).toString() })
  nonce: string;

  @ApiProperty({
    description: 'User full name',
    example: 'Morteza Karimi',
  })
  @Prop()
  fullName: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

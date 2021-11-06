import { ApiProperty } from '@nestjs/swagger';
import { IsEthereumAddress } from 'class-validator';

export class CreateUserDto {
  /**
   * New user wallet address to use for login
   * @example 0x03Cda2965b389A193AD9Fd50973Cc1C1Eb557A8a
   */
  @ApiProperty({
    description: 'User wallet address to use for login',
    example: '0x03Cda2965b389A193AD9Fd50973Cc1C1Eb557A8a',
  })
  @IsEthereumAddress()
  walletAddress: string;
}

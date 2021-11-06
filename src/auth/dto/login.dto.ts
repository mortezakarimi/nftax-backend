import { ApiProperty } from '@nestjs/swagger';
import { IsEthereumAddress, IsHexadecimal } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: '0x07bfE86EcC8E91Ff797C73112A6e6093C9626252' })
  @IsEthereumAddress()
  walletAddress: string;

  @ApiProperty({
    example:
      '0x41d9de137d3437edb9f45c7d198c09f6cb18180dc6e7947dace5101700aa19cc6442b4226c51c75ae40335b8e1dcdf3594aece03b83545fbe75c231c651b94261c',
  })
  @IsHexadecimal()
  signature: string;
}

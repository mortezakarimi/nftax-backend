import { ApiProperty } from '@nestjs/swagger';

export class ERC721TransferEntity {
  /**
   * The block number of item
   * @example 4708120
   */
  @ApiProperty({ example: '4708120', description: 'The block number of item' })
  blockNumber: string;

  @ApiProperty({ example: '1512907118' })
  timeStamp: string;

  @ApiProperty({
    example:
      '0x031e6968a8de362e4328d60dcc7f72f0d6fc84284c452f63176632177146de66',
  })
  hash: string;

  @ApiProperty({
    example: '0',
  })
  nonce: string;

  @ApiProperty({
    example:
      '0x4be19c278bfaead5cb0bc9476fa632e2447f6e6259e0303af210302d22779a24',
  })
  blockHash: string;

  @ApiProperty({
    example: '0xb1690c08e213a35ed9bab7b318de14420fb57d8c',
  })
  from: string;

  @ApiProperty({
    example: '0x06012c8cf97bead5deae237070f9587f8e7a266d',
  })
  contractAddress: string;

  @ApiProperty({
    example: '0x6975be450864c02b4613023c2152ee0743572325',
  })
  to: string;

  @ApiProperty({
    example: '202106',
  })
  tokenID: string;

  @ApiProperty({
    example: 'CryptoKitties',
  })
  tokenName: string;

  @ApiProperty({
    example: 'CK',
  })
  tokenSymbol: string;

  @ApiProperty({
    example: '0',
  })
  tokenDecimal: string;

  @ApiProperty({
    example: '81',
  })
  transactionIndex: string;

  @ApiProperty({
    example: '158820',
  })
  gas: string;

  @ApiProperty({
    example: '40000000000',
  })
  gasPrice: string;

  @ApiProperty({
    example: '60508',
  })
  gasUsed: string;

  @ApiProperty({
    example: '4880352',
  })
  cumulativeGasUsed: string;

  @ApiProperty({
    example: 'deprecated',
  })
  input: string;

  @ApiProperty({
    example: '7990490',
  })
  confirmations: string;

  constructor(partial: Partial<ERC721TransferEntity>) {
    Object.assign(this, partial);
  }
}

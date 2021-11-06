import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ERC721TransferEntity } from './schemas/ERC721Transfer.schema';
import { NftService } from './nft.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('nft')
@ApiTags('NFT')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class NftController {
  constructor(private readonly nftService: NftService) {}

  @Get('/')
  @ApiOperation({ summary: 'Get wallet address nft lists' })
  @ApiResponse({
    status: 200,
    description: 'The founded nft lists',
    type: ERC721TransferEntity,
    isArray: true,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async getList(@Request() req) {
    const user = req.user;
    //0x03Cda2965b389A193AD9Fd50973Cc1C1Eb557A8a
    return this.nftService.getNFTList(user.walletAddress);
  }
}

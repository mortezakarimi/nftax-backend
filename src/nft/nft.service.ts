import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';
import { sortType } from './types/sort.type';
import { ConfigService } from '@nestjs/config';
import { ERC721TransferEntity } from './schemas/ERC721Transfer.schema';
import { plainToClass } from 'class-transformer';
import { EtherscanResponseType } from './types/etherscanResponse.type';

@Injectable()
export class NftService {
  private readonly Apikey;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.Apikey = this.configService.get<string>('ETHERSCAN_API');
  }

  getNFTList(
    address: string,
    contractaddress?: string,
    page = 1,
    offset = 0,
    startblock = 0,
    endblock = 999999999,
    sort: sortType = sortType.ASC,
  ): Observable<ERC721TransferEntity[]> {
    return this.httpService
      .get<EtherscanResponseType<ERC721TransferEntity[]>>(
        `https://api.etherscan.io/api?module=account&action=tokennfttx${
          contractaddress ? `&contractaddress=${contractaddress}` : ''
        }&address=${address}&page=${page}&offset=${offset}&startblock=${startblock}&endblock=${endblock}&sort=${sort}&apikey=${
          this.Apikey
        }`,
      )
      .pipe(
        map((result) => {
          const data = result.data;
          if (Array.isArray(data.result)) {
            return plainToClass(ERC721TransferEntity, data.result || [], {
              enableImplicitConversion: true,
            });
          }
          return [];
        }),
      );
  }

  getAssets(): Observable<any> {
    return this.httpService.get(
      `https://api.opensea.io/api/v1/assets?owner=0x03Cda2965b389A193AD9Fd50973Cc1C1Eb557A8a&order_direction=desc&offset=0&limit=20`,
    );
  }

  getEvents(): Observable<any> {
    return this.httpService.get(
      `https://api.opensea.io/api/v1//events?asset_contract_address=0xf4ee95274741437636e748ddac70818b4ed7d043&token_id=3384&account_address=0x03Cda2965b389A193AD9Fd50973Cc1C1Eb557A8a&event_type=transfer&only_opensea=false&offset=0&limit=20`,
    );
  }
}

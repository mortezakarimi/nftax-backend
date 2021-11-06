import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { recoverPersonalSignature } from '@metamask/eth-sig-util';
import { bufferToHex } from 'ethereumjs-util';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(walletAddress: string, signature: string): Promise<any> {
    const user = await this.usersService.findOneByWalletAddress(walletAddress);
    if (user) {
      const address = recoverPersonalSignature({
        data: bufferToHex(
          Buffer.from(`I am signing my one-time nonce: ${user.nonce}`, 'utf8'),
        ),
        signature,
      });
      if (address.toLowerCase() === user.walletAddress.toLowerCase()) {
        const { _id } = user as any;
        return await this.usersService.updateNonce(_id);
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = { userId: user._id };
    console.log(payload);
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}

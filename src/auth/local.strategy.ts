import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'walletAddress',
      passwordField: 'signature',
      passReqToCallback: true,
    });
  }

  async validate(
    _: string,
    walletAddress: string,
    signature: string,
  ): Promise<any> {
    console.log(walletAddress, signature);
    const user = await this.authService.validateUser(walletAddress, signature);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

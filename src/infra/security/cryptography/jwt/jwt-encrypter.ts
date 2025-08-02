import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Encrypter } from '../encrypter';
import { EnvService } from 'src/env/env.service';

@Injectable()
export class JwtEncrypter implements Encrypter {
  constructor(
    private jwtService: JwtService,
    private envService: EnvService,
  ) {}

  encrypt(payload: Record<string, unknown>): Promise<string> {
    return this.jwtService.signAsync(payload, {
      algorithm: 'RS256',
      privateKey: Buffer.from(this.envService.get('JWT_PRIVATE_KEY'), 'base64'),
    });
  }
}

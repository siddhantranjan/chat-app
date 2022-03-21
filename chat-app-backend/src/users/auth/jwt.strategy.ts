import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { jwtConstants } from './constatns';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        if (!req || !req.cookies) return null;
        return req.cookies['token'];
      },
      ignoreExpiration: true,
      secretOrKey: jwtConstants.secret_key,
    });
  }

  async validate(payload: any) {
    return { userId: payload.id, username: payload.username };
  }
}

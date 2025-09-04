import { User } from 'src/user/entities/user.entity';
import type { Request } from 'express';

export const jwtConstants = {
  secret: 'DRAW LESSONS',
};

export type LoginPayload = {
  email: User['user_email'];
  sub: User['user_id'];
};

export type LocalAuthRequest = Request & {
  user: User;
};

export type JwtAuthRequest = Request & {
  user: LoginPayload;
};

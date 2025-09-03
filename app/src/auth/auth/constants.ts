import { User } from 'src/user/entities/user.entity';

export const jwtConstants = {
  secret: 'DRAW LESSONS',
};

export interface LoginPayload {
  email: User['user_email'];
  sub: User['user_id'];
}

export interface LocalAuthRequest {
  user: User;
}

export interface JwtAuthRequest {
  user: {
    email: User['user_email'];
    sub: User['user_id'];
  };
}

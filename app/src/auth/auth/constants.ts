import { User } from 'src/user/entities/user.entity';

export const jwtConstants = {
  secret: 'DRAW LESSONS',
};

export type LoginPayload = {
  email: User['user_name'];
  sub: User['user_id'];
};

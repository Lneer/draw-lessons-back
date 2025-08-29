import { User } from 'src/user/entities/user.entity';

export const jwtConstants = {
  secret: 'DRAW LESSONS',
};

export type LoginPayload = {
  email: User['user_name'];
  sub: User['user_id'];
};

export interface AuthRequest extends Request {
  user: User;
  logout: () => void;
}
export interface JWtRequest extends Request {
  user: LoginPayload;
}

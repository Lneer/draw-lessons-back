import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.userService.findOne(email);
    if (user && user.user_password === pass) {
      return user;
    }
    throw new UnauthorizedException('User or password are incorrect');
  }

  async register(authDto: AuthDto) {
    const { email, password } = authDto;
    const candidate = await this.userService.findOne(email);
    if (candidate) {
      throw new BadRequestException('User exist');
    }
    const user = await this.userService.create({
      user_email: email,
      user_password: password,
    });
    const payload = { sub: user.user_id, email: user.user_email };
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }

  login(user: User) {
    const payload = { sub: user.user_id, email: user.user_email };
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }

  refresh(user: User) {
    const payload = { sub: user.user_id, email: user.user_email };
    return { access_token: this.jwtService.sign(payload) };
  }
}

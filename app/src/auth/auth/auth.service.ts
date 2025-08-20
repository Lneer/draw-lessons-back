import { Injectable, UnauthorizedException } from '@nestjs/common';
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

  async signIn(date: AuthDto) {
    const user = await this.userService.findByEmail(date.email, date.password);
    console.log(user);
    if (!user) {
      throw new UnauthorizedException();
    }

    const payload = { username: user.user_name, email: user.user_email };
    const access_token = await this.jwtService.signAsync(payload);
    return { user, token: { access_token } };
  }

  async validateUser(email: string, pass: string) {
    const user = await this.userService.findOne(email);
    if (user && user.user_password === pass) {
      return user;
    }
    throw new UnauthorizedException('User or password are incorrect');
  }

  login(user: User) {
    const payload = { username: user.user_name, email: user.user_email };
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }
}

// Примеры использования типизированных guards в контроллерах

import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { LocalAuthGuard, JwtAuthGuard } from '../guards';
import { LocalAuthRequest, JwtAuthRequest } from '../constants';
import { User } from 'src/user/entities/user.entity';

@Controller('example')
export class ExampleController {
  
  // Пример использования LocalAuthGuard с типизированным request
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: LocalAuthRequest) {
    // req.user теперь типизирован как User
    const user: User = req.user;
    return {
      message: 'Login successful',
      user: {
        id: user.user_id,
        name: user.user_name,
        email: user.user_email,
        role: user.user_role,
      },
    };
  }

  // Пример использования JwtAuthGuard с типизированным request
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req: JwtAuthRequest) {
    // req.user теперь типизирован как { email: string, sub: string }
    const { email, sub } = req.user;
    return {
      message: 'Profile data',
      userId: sub,
      email: email,
    };
  }

  // Пример комбинированного использования
  @Get('protected')
  @UseGuards(JwtAuthGuard)
  async protectedRoute(@Request() req: JwtAuthRequest) {
    // Доступ к типизированным данным пользователя
    return {
      message: 'This is a protected route',
      user: req.user,
    };
  }
}

// Пример использования в других контроллерах
@Controller('tasks')
export class TasksControllerExample {
  
  @Post()
  @UseGuards(JwtAuthGuard)
  async createTask(
    @Request() req: JwtAuthRequest,
    @Body() createTaskDto: any,
  ) {
    // Получаем ID пользователя из JWT токена
    const userId = req.user.sub;
    
    return {
      message: 'Task created',
      createdBy: userId,
      task: createTaskDto,
    };
  }

  @Get('my-tasks')
  @UseGuards(JwtAuthGuard)
  async getMyTasks(@Request() req: JwtAuthRequest) {
    // Используем типизированные данные пользователя
    const { sub: userId, email } = req.user;
    
    return {
      message: `Tasks for user ${email}`,
      userId,
      tasks: [], // Здесь будет логика получения задач
    };
  }
}

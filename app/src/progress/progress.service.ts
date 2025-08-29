import { Inject, Injectable } from '@nestjs/common';
import { CreateProgressDto } from './dto/create-progress.dto';
// import { UpdateProgressDto } from './dto/update-progress.dto';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Progress } from './entities/progress.entity';
import { progressRepository } from './constants';

type SearchConditions = {
  id?: Progress['id'];
  homework_count?: Progress['homework_count'];
  feedback_count?: Progress['feedback_count'];
  is_complete?: Progress['is_complete'];
  created_at?: Progress['created_at'];
  changed_at?: Progress['changed_at'];
  task_id?: Progress['task_id'];
  user_id?: Progress['user_id'];
};

@Injectable()
export class ProgressService {
  constructor(
    @Inject(progressRepository)
    private progressRepository: Repository<Progress>,
  ) {}

  create(createProgressDto: CreateProgressDto) {
    return this.progressRepository.save(createProgressDto);
    return 'This action adds a new progress';
  }

  // findAll() {
  //   return `This action returns all progress`;
  // }

  findByUserId(user_id: User['user_id']) {
    return this.progressRepository.find({
      where: {
        user_id,
        task: { is_active: true },
      },
      relations: ['task', 'task.term'],
      select: {
        task_id: false,
        user_id: false,
        task: { task_num: true, task_name: true, term: { id: true } },
      },
    });
  }
  countBy(searchConditions: SearchConditions) {
    if (!searchConditions) {
      return 0;
    }
    return this.progressRepository.count({
      where: { ...searchConditions },
    });
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} progress`;
  // }

  // update(id: number, updateProgressDto: UpdateProgressDto) {
  //   return `This action updates a #${id} progress`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} progress`;
  // }
}

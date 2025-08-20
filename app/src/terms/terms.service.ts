import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTermDto } from './dto/create-term.dto';
import { UpdateTermDto } from './dto/update-term.dto';
import { termRepository } from './constants';
import { Term } from './entities/term.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TermsService {
  constructor(
    @Inject(termRepository)
    private termRepository: Repository<Term>,
  ) {}

  findAll() {
    return this.termRepository.find({
      relations: ['tasks'],
      order: {
        tasks: {
          task_num: 'ASC',
        },
      },
      select: {
        tasks: {
          task_name: true,
          task_num: true,
        },
      },
    });
  }

  async findOne(id: Term['id']) {
    const term = await this.termRepository.findOne({
      where: { id },
      order: {
        tasks: {
          task_num: 'ASC',
        },
      },
      relations: ['tasks'],
    });

    if (!term) {
      throw new NotFoundException('Term not found'); 
    }
    return term;
  }

  create(createTermDto: CreateTermDto) {
    return 'This action adds a new term';
  }

  update(id: number, updateTermDto: UpdateTermDto) {
    return `This action updates a #${id} term`;
  }

  remove(id: number) {
    return `This action removes a #${id} term`;
  }
}

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
      where: {
        is_active: true,
      },
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
      where: { id, is_active: true },
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
    return this.termRepository.save(createTermDto);
  }

  async update(id: Term['id'], updateTermDto: UpdateTermDto) {
    const entityToUpdate = await this.termRepository.findOne({
      where: { id },
    });
    if (!entityToUpdate) {
      throw new NotFoundException('Term not found');
    }
    return this.termRepository.save({ ...entityToUpdate, ...updateTermDto });
  }

  async isOrderExist(order: Term['order']) {
    return !!(await this.termRepository.count({
      where: {
        order,
      },
    }));
  }
}

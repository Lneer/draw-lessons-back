import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  BadRequestException,
} from '@nestjs/common';
import { TermsService } from './terms.service';
import { CreateTermDto } from './dto/create-term.dto';
import { UpdateTermDto } from './dto/update-term.dto';

@Controller('terms')
export class TermsController {
  constructor(private readonly termsService: TermsService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  async create(@Body() createTermDto: CreateTermDto) {
    const { order } = createTermDto;
    const isOrder = await this.termsService.isOrderExist(order);
    if (isOrder) {
      throw new BadRequestException(`Record with order ${order} is exist`);
    }
    return this.termsService.create(createTermDto);
  }
  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.termsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.termsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTermDto: UpdateTermDto) {
    const { order } = updateTermDto;
    if (order) {
      const isOrderExist = await this.termsService.isOrderExist(order);
      if (isOrderExist) {
        throw new BadRequestException(`Record with order ${order} is exist`);
      }
    }
    return this.termsService.update(id, updateTermDto);
  }
}

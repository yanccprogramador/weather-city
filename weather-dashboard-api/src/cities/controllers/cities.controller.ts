import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CitiesService } from '../services/cities.service';
import { AuthGuard } from '../../auth/guard/auth.guard';
import { City } from '../entities/city.entity';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() city: City, @Request() req) {
    try {
      return this.citiesService.create(req.user, city);
    } catch (err) {
      return err;
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Request() req) {
    try {
      return this.citiesService.findAll(req.user);
    } catch (err) {
      return err;
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: number) {
    try {
      return this.citiesService.findOne(+id);
    } catch (err) {
      return err;
    }
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: number, @Body() city: City) {
    try {
      return this.citiesService.update(+id, city);
    } catch (err) {
      return err;
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: number) {
    try {
      return this.citiesService.remove(+id);
    } catch (err) {
      return err;
    }
  }
}

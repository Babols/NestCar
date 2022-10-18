import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { Car } from './Interfaces/cars.interface';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  // @Post()
  // create(@Body() createCarDto: CreateCarDto) {
  //   return this.carsService.create(createCarDto);
  // }

  @Post()
  createNewCar(@Body() newCar: CreateCarDto) {
    this.carsService.create(newCar);
  }

  @Get()
  findAll(): Car[] {
    return this.carsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carsService.findOne(id);
  }

  @Patch(':id')
  updateCar(@Param('id') id: string, @Body() car: CreateCarDto) {
    return this.carsService.update(id, car);
  }

  @Delete(':id')
  deleteCar(@Param('id') id: string) {
    return this.carsService.delete(id);
  }
}

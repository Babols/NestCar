import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { Car } from './Interfaces/cars.interface';

@Injectable()
export class CarsService {
  cars: Car[] = [
    { id: '1', name: 'lambo' },
    { id: '2', name: 'porsche' },
    { id: '3', name: 'ferrari' },
  ];

  // create(createCarDto: CreateCarDto) {
  //   return 'This action adds a new car';
  // }

  create(car: CreateCarDto) {
    this.cars = [...this.cars, car];
  }

  findAll(): Car[] {
    return this.cars;
  }

  findOne(id: string) {
    return this.cars.find((car) => car.id === id);
  }

  update(id: string, car: Car) {
    const carToUpdate = this.cars.find((car) => car.id === id);
    if (!carToUpdate) {
      return new NotFoundException('boooo did you find this car');
    }
    if (car.name) {
      carToUpdate.name = car.name;
    }
    const updateCars = this.cars.map((car) =>
      car.id !== id ? car : carToUpdate,
    );
    this.cars = [...updateCars];
    return { updateCars: 1, car: carToUpdate };
  }
  delete(id: string) {
    const nbOfCarsBeforeDelete = this.cars.length;
    this.cars = [...this.cars.filter((car) => car.id !== id)];
    if (this.cars.length < nbOfCarsBeforeDelete) {
      return { deleteCars: 1, nbCars: this.cars.length };
    } else {
      return { deleteCars: 0, nbCars: this.cars.length };
    }
  }
}

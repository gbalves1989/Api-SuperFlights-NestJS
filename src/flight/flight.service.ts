import { PassengerService } from './../passenger/passenger.service'
import { IFlight } from './../common/interfaces/flight.interface'
import { FlightDTO } from './dto/flight.dto'
import { FlightRepository } from './../common/repositories/flight.repository'
import { Injectable } from '@nestjs/common'
import { HttpException } from '@nestjs/common/exceptions'
import { HttpStatus } from '@nestjs/common/enums'

@Injectable()
export class FlightService {
  constructor(
    private readonly flightRepository: FlightRepository,
    private readonly passengerService: PassengerService,
  ) {}

  async create(flightDTO: FlightDTO): Promise<IFlight> {
    return await this.flightRepository.create(flightDTO)
  }

  async findAll(): Promise<IFlight[]> {
    return await this.flightRepository.findAll()
  }

  async findOne(id: string): Promise<IFlight> {
    return await this.flightRepository.findOne(id)
  }

  async update(id: string, flightDTO: FlightDTO): Promise<IFlight> {
    return await this.flightRepository.update(id, flightDTO)
  }

  async delete(id: string): Promise<void> {
    return await this.flightRepository.delete(id)
  }

  async addPassenger(flightId: string, passengerId: string): Promise<IFlight> {
    const passenger = this.passengerService.findOne(passengerId)

    if (!passenger) {
      throw new HttpException('Passenger not found.', HttpStatus.NOT_FOUND)
    }

    return await this.flightRepository.addPassenger(flightId, passengerId)
  }
}

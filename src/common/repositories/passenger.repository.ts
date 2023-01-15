import { PassengerDTO } from '../../passenger/dto/passenger.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { IPassenger } from '../interfaces/passenger.interface'
import { PASSENGER } from '../models/models'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PassengerRepository {
  constructor(
    @InjectModel(PASSENGER.name) private readonly model: Model<IPassenger>,
  ) {}

  async create(passengerDTO: PassengerDTO): Promise<IPassenger> {
    const newPassenger = new this.model({ ...passengerDTO })
    return await newPassenger.save()
  }

  async findAll(): Promise<IPassenger[]> {
    return await this.model.find()
  }

  async findOne(id: string): Promise<IPassenger> {
    return await this.model.findById(id)
  }

  async update(id: string, passengerDTO: PassengerDTO): Promise<IPassenger> {
    const passenger = { ...passengerDTO }
    return await this.model.findByIdAndUpdate(id, passenger, { new: true })
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id)
  }
}

import { FlightRepository } from './../common/repositories/flight.repository'
import { PassengerModule } from './../passenger/passenger.module'
import { FlightSchema } from './schema/flight.schema'
import { FLIGHT } from './../common/models/models'
import { MongooseModule } from '@nestjs/mongoose'
import { Module } from '@nestjs/common'
import { FlightController } from './flight.controller'
import { FlightService } from './flight.service'

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: FLIGHT.name,
        useFactory: () => FlightSchema.plugin(require('mongoose-autopopulate')),
      },
    ]),
    PassengerModule,
  ],
  controllers: [FlightController],
  providers: [FlightService, FlightRepository],
})
export class FlightModule {}

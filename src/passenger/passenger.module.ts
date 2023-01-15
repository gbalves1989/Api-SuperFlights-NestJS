import { PassengerRepository } from '../common/repositories/passenger.repository'
import { PassengerSchema } from './schema/passenger.schema'
import { PASSENGER } from './../common/models/models'
import { MongooseModule } from '@nestjs/mongoose'
import { Module } from '@nestjs/common'
import { PassengerService } from './passenger.service'
import { PassengerController } from './passenger.controller'

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: PASSENGER.name,
        useFactory: () => {
          return PassengerSchema
        },
      },
    ]),
  ],
  providers: [PassengerService, PassengerRepository],
  controllers: [PassengerController],
  exports: [PassengerService],
})
export class PassengerModule {}

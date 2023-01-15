import { UserRespository } from './../common/repositories/user.repository'
import { USER } from './../common/models/models'
import { MongooseModule } from '@nestjs/mongoose'
import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { UserSchema } from './schema/user.schema'

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: USER.name,
        useFactory: () => {
          return UserSchema
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, UserRespository],
  exports: [UserService],
})
export class UserModule {}

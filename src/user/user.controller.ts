import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard'
import { UserService } from './user.service'
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  HttpCode,
} from '@nestjs/common'
import { IUser, IUserRepository } from './../common/interfaces/user.interface'
import { UserDTO } from './dto/user.dto'
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger/dist'
import { UseGuards } from '@nestjs/common/decorators'

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('/api/v1/user')
export class UserController implements IUserRepository {
  constructor(private readonly userService: UserService) {}

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete User',
    description: 'Delete some user',
  })
  delete(@Param('id') id: string): Promise<void> {
    return this.userService.delete(id)
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update User',
    description: 'Update information some user',
  })
  update(@Param('id') id: string, @Body() userDTO: UserDTO): Promise<IUser> {
    return this.userService.update(id, userDTO)
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Return user',
    description: 'Return some user',
  })
  findOne(@Param('id') id: string): Promise<IUser> {
    return this.userService.findOne(id)
  }

  @Get()
  @ApiOperation({
    summary: 'Return all users',
    description: 'Return a list of users',
  })
  findAll(): Promise<IUser[]> {
    return this.userService.findAll()
  }

  @Post()
  @ApiOperation({
    summary: 'Create user',
    description: 'Create a new user',
  })
  create(@Body() userDTO: UserDTO): Promise<IUser> {
    return this.userService.create(userDTO)
  }
}

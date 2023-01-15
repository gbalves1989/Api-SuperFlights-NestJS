import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard'
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger/dist'
import { PassengerService } from './passenger.service'
import {
  IPassenger,
  IPassengerRepository,
} from './../common/interfaces/passenger.interface'
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
} from '@nestjs/common'
import { PassengerDTO } from './dto/passenger.dto'
import { UseGuards } from '@nestjs/common/decorators'

@ApiTags('passengers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('/api/v1/passenger')
export class PassengerController implements IPassengerRepository {
  constructor(private readonly passengerService: PassengerService) {}

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete passenger',
    description: 'Delete some passenger',
  })
  delete(@Param('id') id: string): Promise<void> {
    return this.passengerService.delete(id)
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update passenger',
    description: 'Update some passenger',
  })
  update(
    @Param('id') id: string,
    @Body() passengerDTO: PassengerDTO,
  ): Promise<IPassenger> {
    return this.passengerService.update(id, passengerDTO)
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Return passenger',
    description: 'Return some passenger',
  })
  findOne(@Param('id') id: string): Promise<IPassenger> {
    return this.passengerService.findOne(id)
  }

  @Get()
  @ApiOperation({
    summary: 'Return all passengers',
    description: 'Return a list of passengers',
  })
  findAll(): Promise<IPassenger[]> {
    return this.passengerService.findAll()
  }

  @Post()
  @ApiOperation({
    summary: 'Create passenger',
    description: 'Create a new passenger',
  })
  create(@Body() passengerDTO: PassengerDTO): Promise<IPassenger> {
    return this.passengerService.create(passengerDTO)
  }
}

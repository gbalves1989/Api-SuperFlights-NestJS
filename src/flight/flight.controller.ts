import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard'
import { UseGuards } from '@nestjs/common/decorators'
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger/dist'
import { FlightService } from './flight.service'
import {
  IFlight,
  IFlightRepository,
} from './../common/interfaces/flight.interface'
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
import { FlightDTO } from './dto/flight.dto'

@ApiTags('flights')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('/api/v1/flight')
export class FlightController implements IFlightRepository {
  constructor(private readonly flightService: FlightService) {}

  @Post(':flightId/passenger/:passengerId')
  @ApiOperation({
    summary: 'Add a new passenger in flight',
    description: 'Add a new passenger in flight',
  })
  addPassenger(
    @Param('flightId') flightId: string,
    @Param('passengerId') passengerId: string,
  ): Promise<IFlight> {
    return this.flightService.addPassenger(flightId, passengerId)
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete flight',
    description: 'Delete some flight',
  })
  delete(@Param('id') id: string): Promise<void> {
    return this.flightService.delete(id)
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update flight',
    description: 'update some flight',
  })
  update(
    @Param('id') id: string,
    @Body() flightDTO: FlightDTO,
  ): Promise<IFlight> {
    return this.flightService.update(id, flightDTO)
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Return flight',
    description: 'Return some flight',
  })
  findOne(@Param('id') id: string): Promise<IFlight> {
    return this.flightService.findOne(id)
  }

  @Get()
  @ApiOperation({
    summary: 'Return all flights',
    description: 'Return a list of flights',
  })
  findAll(): Promise<IFlight[]> {
    return this.flightService.findAll()
  }

  @Post()
  @ApiOperation({
    summary: 'Create flight',
    description: 'Create a new flight',
  })
  create(@Body() flightDTO: FlightDTO): Promise<IFlight> {
    return this.flightService.create(flightDTO)
  }
}

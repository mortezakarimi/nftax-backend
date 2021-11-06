import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/User.schema';
import { Response } from 'express';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({
    status: 201,
    description: 'Newly created user',
    type: User,
  })
  @ApiResponse({
    status: 200,
    description: 'Already exist user',
    type: User,
  })
  @Post('register')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  )
  async create(@Res() res: Response, @Body() createUserDto: CreateUserDto) {
    const foundedUser = await this.usersService.findOneByWalletAddress(
      createUserDto.walletAddress,
    );

    if (foundedUser) {
      return res.status(HttpStatus.OK).send(foundedUser);
    }

    const user = await this.usersService.create(createUserDto);
    return res.status(HttpStatus.CREATED).send(user);
  }
}

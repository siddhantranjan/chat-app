import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  BadRequestException,
  Query,
  Request,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { RelationshipService } from './relationship.service';
import { CreateRelationshipDto } from './dto/create-relationship.dto';
import { UpdateRelationshipDto } from './dto/update-relationship.dto';
import { UsersService } from 'src/users/users.service';
import { JwtAuthGuard } from 'src/users/auth/jwt-auth-guard';

@UseGuards(JwtAuthGuard)
@Controller('relationship')
export class RelationshipController {
  constructor(
    private relationshipService: RelationshipService,
    private readonly usersService: UsersService,
  ) {}

  @Post('/users')
  async create(
    @Body() { recepient, status }: CreateRelationshipDto,
    @Request() req,
  ) {
    const { userId } = req.user;

    if (!userId) {
      throw new BadRequestException();
    }

    if (userId === recepient) {
      throw new BadRequestException('Invalid parameters');
    }
    const relation = await this.relationshipService.findRelation(
      userId,
      recepient,
    );

    if (relation) {
      throw new BadRequestException('Relation Already Exist');
    }

    return this.relationshipService.create(userId, recepient, status);
  }

  @Get('/get')
  async getRelation(@Query('recepient') recepient: number, @Request() req) {
    const { userId } = req.user;
    const relation = await this.relationshipService.findRelation(
      userId,
      recepient,
    );

    return relation;
  }

  @Get('/')
  async getAllRelation(@Query('status') status: string, @Request() req) {
    const { userId } = req.user;
    const relation = await this.relationshipService.findAllRelation(
      status,
      userId,
    );

    const recepientIds = [];
    relation.forEach((value) => {
      recepientIds.push(
        value.recepient === userId ? value.sender : value.recepient,
      );
    });

    const relatedUsers = await this.usersService.findAllIds(recepientIds);
    return relatedUsers;
  }

  @Patch('/update')
  update(@Body() { recepient, status }: UpdateRelationshipDto, @Request() req) {
    const { userId } = req.user;

    if (userId === recepient) {
      throw new BadRequestException('Invalid parameters');
    }

    return this.relationshipService.update(userId, recepient, status);
  }

  @Delete('/all')
  async deleteAll() {
    await this.relationshipService.deleteAll();
  }
}

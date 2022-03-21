import { IsNumber, IsString } from 'class-validator';

export class UpdateRelationshipDto {
  @IsNumber()
  recepient: number;

  @IsString()
  status: string;
}

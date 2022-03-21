import { IsNumber, IsString } from 'class-validator';

export class CreateRelationshipDto {
  @IsNumber()
  recepient: number;

  @IsString()
  status: string;
}

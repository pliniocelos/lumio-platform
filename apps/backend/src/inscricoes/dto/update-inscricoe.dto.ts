import { PartialType } from '@nestjs/mapped-types';
import { CreateInscricoeDto } from './create-inscricoe.dto';

export class UpdateInscricoeDto extends PartialType(CreateInscricoeDto) {}

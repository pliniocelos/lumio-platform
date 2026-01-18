import { PartialType } from '@nestjs/mapped-types';
import { CreatePalestranteDto } from './create-palestrante.dto';

export class UpdatePalestranteDto extends PartialType(CreatePalestranteDto) {}

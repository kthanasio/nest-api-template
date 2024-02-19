import { PartialType } from '@nestjs/mapped-types';
import { CreateClienteDto } from './create-cliente.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateClienteDto extends PartialType(CreateClienteDto) {
  @ApiProperty({
    description: 'Nome do cliente',
    required: true,
  })
  nome: string;
  @ApiProperty({
    description: 'Email do cliente',
    required: true,
  })
  email: string;
  @ApiProperty({
    description: 'Status do cliente',
    required: true,
    default: true,
  })
  status: boolean;
}

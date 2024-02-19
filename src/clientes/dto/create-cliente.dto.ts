import { ApiProperty } from '@nestjs/swagger';

export class CreateClienteDto {
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

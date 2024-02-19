import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { ApiBearerAuth, ApiOAuth2, ApiTags } from '@nestjs/swagger';
import { Resource, Roles } from 'nest-keycloak-connect';

@ApiTags('Clientes')
@Controller('clientes')
@Resource('selia-core-backend')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Post()
  @ApiOAuth2([])
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @Roles({ roles: ['clientes-create', 'clientes-admin'] })
  async create(@Body() createClienteDto: CreateClienteDto) {
    return await this.clientesService.create(createClienteDto);
  }

  @Get()
  @ApiOAuth2([])
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Roles({ roles: ['clientes-list', 'clientes-admin'] })
  async findAll() {
    return await this.clientesService.findAll();
  }

  @Get(':codigo')
  @ApiOAuth2([])
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Roles({ roles: ['clientes-read', 'clientes-admin'] })
  async findOne(@Param('codigo') codigo: string) {
    const cliente = await this.clientesService.findOne(codigo);
    if (!cliente) {
      throw new HttpException('Cliente não encontrado.', HttpStatus.NOT_FOUND);
    }
    return cliente;
  }

  @Patch(':codigo')
  @ApiOAuth2([])
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Roles({ roles: ['clientes-update', 'clientes-admin'] })
  async update(
    @Param('codigo') codigo: string,
    @Body() updateClienteDto: UpdateClienteDto,
  ) {
    const updateResult = await this.clientesService.update(
      codigo,
      updateClienteDto,
    );
    if (updateResult.affected === 0) {
      throw new HttpException('Cliente não encontrado.', HttpStatus.NOT_FOUND);
    }
    return updateClienteDto;
  }

  @Delete(':codigo')
  @ApiOAuth2([])
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles({ roles: ['clientes-delete', 'clientes-admin'] })
  async remove(@Param('codigo') codigo: string) {
    return await this.clientesService.remove(codigo);
  }
}

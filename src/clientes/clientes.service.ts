import { Injectable, Scope } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Cliente } from './entities/cliente.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable({ scope: Scope.REQUEST })
export class ClientesService {
  constructor(
    @InjectRepository(Cliente) private clientesRepository: Repository<Cliente>,
  ) {}

  async create(createClienteDto: CreateClienteDto) {
    return this.clientesRepository.save(createClienteDto);
  }

  async findAll() {
    return this.clientesRepository.find();
  }

  async findOne(codigo: string) {
    return this.clientesRepository.findOneBy({ codigo: codigo });
  }

  async update(codigo: string, updateClienteDto: UpdateClienteDto) {
    return this.clientesRepository.update({ codigo: codigo }, updateClienteDto);
  }

  async remove(codigo: string) {
    return this.clientesRepository.delete({ codigo: codigo });
  }
}

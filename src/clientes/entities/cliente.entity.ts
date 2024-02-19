import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
} from 'typeorm';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  @Generated('uuid')
  codigo: string;
  @Column()
  nome: string;
  @Column()
  email: string;
  @Column()
  status: boolean;
  @CreateDateColumn()
  data_criacao: Date;
  @UpdateDateColumn()
  data_alteracao: Date;
}

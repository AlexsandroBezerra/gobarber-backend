import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm'

import User from './User'

@Entity('appointments')
export default class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'provider_id' })
  providerId: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User

  @Column('time with time zone')
  date: Date

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}

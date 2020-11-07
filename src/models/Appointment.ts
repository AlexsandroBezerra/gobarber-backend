import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('appointments')
export default class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  provider: string

  @Column('time with time zone')
  date: Date
}

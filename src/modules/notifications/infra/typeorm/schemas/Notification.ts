import {
  ObjectID,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn
} from 'typeorm'

@Entity('notifications')
export default class Notification {
  @ObjectIdColumn()
  id: ObjectID

  @Column()
  content: string

  @Column('uuid', { name: 'recipient_id' })
  recipientId: string

  @Column({ default: false })
  read: boolean

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}

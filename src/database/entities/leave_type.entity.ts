import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'leave_type' })
export class LeaveTypes {
  @PrimaryGeneratedColumn()
  lt_id: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  lt_name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  lt_created_at: Date;
}

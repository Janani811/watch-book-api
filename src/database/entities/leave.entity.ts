import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'leave' })
export class Leave {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  le_id: number;

  @Column({ type: 'bigint', nullable: true })
  le_emp_id: number;

  @Column({ type: 'bigint', nullable: true })
  le_org_id: number;

  @Column({ type: 'bigint', nullable: true })
  le_applied_to: number;

  @Column({ type: 'text', nullable: true })
  le_reason: string;

  @Column({ type: 'bigint', nullable: true })
  le_type: number;

  @Column({ type: 'timestamp', nullable: true })
  le_from_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  le_to_date: Date;

  @Column({ type: 'int', default: 0 })
  le_status: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  le_created_at: Date;
}

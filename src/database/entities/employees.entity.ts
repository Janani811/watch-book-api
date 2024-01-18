import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'employees' })
export class Employees {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  emp_id: number;

  @Column({ type: 'bigint', nullable: true })
  emp_us_id: number;

  @Column({ type: 'bigint', nullable: true })
  emp_org_id: number;

  @Column({ type: 'bigint', nullable: true })
  emp_role: number;

  @Column({ type: 'bigint', nullable: true })
  emp_created_by: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  emp_created_at: Date;
}

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'employee_projects' })
export class employeesProjects {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  empr_id: number;

  @Column({ type: 'bigint', nullable: true })
  empr_pro_id: number;

  @Column({ type: 'bigint', nullable: true })
  empr_emp_id: number;

  @Column({ type: 'bigint', nullable: true })
  empr_org_id: number;

  @Column({ type: 'bigint', nullable: true })
  empr_assigned_by: number;

  @Column({ type: 'int', default: 0 })
  empr_emp_active: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  empr_assigned_at: Date;
}

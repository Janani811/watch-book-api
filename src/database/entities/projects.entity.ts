import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'projects' })
export class Projects {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  pro_id: number;

  @Column({ type: 'varchar', nullable: true })
  pro_name: string;

  @Column({ type: 'bigint', nullable: true })
  pro_org_id: number;

  @Column({ type: 'bigint', nullable: true })
  pro_created_by: number;

  @Column({ type: 'int', default: 0 })
  pro_is_deleted: number;

  @Column({ type: 'int', default: 0 })
  pro_active: boolean;

  @Column({ type: 'text', nullable: true })
  pro_details: string;

  @Column({ type: 'varchar', nullable: true })
  pro_estimation_time: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  pro_created_at: Date;
}

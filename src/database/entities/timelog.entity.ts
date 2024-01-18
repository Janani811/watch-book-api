import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'timelog' })
export class Timelog {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  tl_id: number;

  @Column({ type: 'bigint', nullable: true })
  tl_emp_id: number;

  @Column({ type: 'bigint', nullable: true })
  tl_org_id: number;

  @Column({ type: 'bigint', nullable: true })
  tl_pro_id: number;

  @Column({ type: 'text', nullable: true })
  tl_description: string;

  @Column({ type: 'bigint', nullable: true })
  tl_type: number;

  @Column({ type: 'timestamp', nullable: true })
  tl_date: Date;

  @Column({ type: 'time', nullable: true })
  tl_from: Date;

  @Column({ type: 'time', nullable: true })
  tl_to: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  tl_created_at: Date;
}

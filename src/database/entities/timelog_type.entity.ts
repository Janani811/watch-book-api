import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'timelog_type' })
export class TimeLogType {
  @PrimaryGeneratedColumn()
  tt_id: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  tt_name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  tt_created_at: Date;
}

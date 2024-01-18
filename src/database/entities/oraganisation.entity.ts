import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'organisations' })
export class Organisations {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  org_id: number;

  @Column({ type: 'varchar', nullable: true })
  org_email: string;

  @Column({ type: 'varchar', nullable: true })
  org_name: string;

  @Column({ type: 'text', nullable: true })
  org_address: string;

  @Column({ type: 'text', nullable: true })
  org_details: string;

  @Column({ type: 'varchar', nullable: true })
  org_phone_no: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  org_created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  org_updated_at: Date;
}

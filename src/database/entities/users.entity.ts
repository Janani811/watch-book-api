import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class Users {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  us_id: number;

  @Column({ type: 'varchar', nullable: true })
  us_name: string;

  @Column({ type: 'varchar', nullable: true })
  us_email: string;

  @Column({ type: 'varchar', nullable: true })
  us_password: string;

  @Column({ type: 'varchar', nullable: true })
  us_password_salt: string;

  @Column({ type: 'bigint', nullable: true })
  us_org_id: number;

  @Column({ type: 'int', default: 0 })
  us_active: number;

  @Column({ default: 3, nullable: true })
  us_type: number;

  @Column({ type: 'int', default: 0 })
  us_is_deleted: boolean;

  @Column({ type: 'varchar', nullable: true })
  us_verification_token: string;

  @Column({ type: 'text', nullable: true })
  us_address: string;

  @Column({ type: 'varchar', nullable: true })
  us_phone_no: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  us_created_at: Date;
}

/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { Users } from '../../../database/entities/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Organisations } from '../../../database/entities/oraganisation.entity';

@Injectable()
export class UsersRepository {
  constructor(
    private config: ConfigService,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(Organisations)
    private orgRepository: Repository<Organisations>,
  ) {}

  async findUserWithOrganisation(params: { id?: number; email?: string }) {
    let query = await this.usersRepository
      .createQueryBuilder('users')
      .select(['users.*', 'organisation.*'])
      .innerJoin(Organisations, 'organisation', 'organisation.org_id = users.us_org_id');

    if (params.id) {
      query.andWhere('users.us_id = :q', { q: params.id });
    }

    if (params.email) {
      query.andWhere(`users.us_email = :q`, { q: params.email });
    }

    let user = query.getRawOne();

    if (!user) {
      return null;
    }
    return user;
  }

  async updateUser(id: number, data: Partial<Users>) {
    await this.usersRepository
      .createQueryBuilder()
      .update(Users)
      .set({ ...data })
      .where('us_id = :id', { id: id })
      .execute();
    let user = await this.findUserWithOrganisation({ id: id });
    return user;
  }

  async findOne(queryParams: Partial<Users>) {
    let user = await this.usersRepository.findOne({
      where: {
        ...queryParams,
      },
    });
    return user;
  }
  async findOneOrganisation(queryParams: Partial<Organisations>) {
    let oraganisation = await this.orgRepository.findOne({
      where: {
        ...queryParams,
      },
    });
    return oraganisation;
  }
  async createOrganisation(data: Partial<Organisations>) {
    return await this.orgRepository
      .createQueryBuilder()
      .insert()
      .into(Organisations, ['org_name', 'org_address', 'org_email'])
      .values(data)
      .execute();
  }
  async createUser(data: Partial<Users>) {
    return await this.usersRepository
      .createQueryBuilder()
      .insert()
      .into(Users, [
        'us_name',
        'us_email',
        'us_password',
        'us_password_salt',
        'us_org_id',
        'us_type',
      ])
      .values(data)
      .execute();
  }
}

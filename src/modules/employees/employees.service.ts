import { Injectable, BadRequestException } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmployeesService {
  constructor(private config: ConfigService) {}

  async fetchEmployees(org_id: number) {
    try {
      // const employees: any = await this.knex
      //   .table('users')
      //   .leftJoin('employees', 'emp_us_id', 'us_id')
      //   .where({ us_org_id: org_id, us_type: 3 })
      //   .column('*');

      return { employees: [] };
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async addEmployees(data: any) {
    // await this.knex.table('users').where({ us_id: data.userId }).update({
    //   us_name: data.name,
    //   us_email: data.email,
    // });
    // await this.knex.table('organisations').where({ org_id: data.orgId }).update({
    //   org_name: data.orgName,
    //   org_address: data.orgAddress,
    //   org_email: data.email,
    //   org_phone_no: data.phone,
    // });

    // const [user]: any = await this.knex
    //   .table('users')
    //   .join('organisations', 'users.us_org_id', '=', 'organisations.org_id')
    //   .where('us_id', data.userId)
    //   .select('*');
    // delete user.password;
    return { user: {} };
  }
}

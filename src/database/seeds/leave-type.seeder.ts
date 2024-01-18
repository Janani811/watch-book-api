import { LeaveTypes } from '../entities/leave_type.entity';

import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';

export default class CreateLeaveType implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const repository = dataSource.getRepository(LeaveTypes);
    await repository.insert([
      {
        lt_id: 1,
        lt_name: 'Sick',
      },
      {
        lt_id: 2,
        lt_name: 'Casual',
      },
      {
        lt_id: 3,
        lt_name: 'Optional',
      },
      {
        lt_id: 4,
        lt_name: 'Others',
      },
    ]);
  }
}

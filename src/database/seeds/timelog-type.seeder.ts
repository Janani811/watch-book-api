import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { TimeLogType } from '../entities/timelog_type.entity';

export default class CreateTimeLogType implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const repository = dataSource.getRepository(TimeLogType);
    await repository.insert([
      {
        tt_id: 1,
        tt_name: 'Billable',
      },
      {
        tt_id: 2,
        tt_name: 'Non-Billable',
      },
      {
        tt_id: 3,
        tt_name: 'Idle',
      },
      {
        tt_id: 4,
        tt_name: 'Break',
      },
    ]);
  }
}

exports.seed = function (knex) {
  return knex('timelog_type')
    .del()
    .then(function () {
      return knex('timelog_type').insert([
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
    });
};

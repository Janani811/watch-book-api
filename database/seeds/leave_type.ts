exports.seed = function (knex) {
  return knex('leave_type')
    .del()
    .then(function () {
      return knex('leave_type').insert([
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
    });
};

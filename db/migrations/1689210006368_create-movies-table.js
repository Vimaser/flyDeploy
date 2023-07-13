/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('movies', {
        id: 'id',
        title: { type: 'varchar(255)', notNull: true },
        createdAt: {
          type: 'timestamp',
          notNull: true,
          default: pgm.func('current_timestamp'),
        },
        release_date: { type: 'timestamp' },
      });
};

exports.down = pgm => {
    pgm.dropTable('movies');
};

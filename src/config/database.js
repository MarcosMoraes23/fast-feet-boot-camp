module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'fast-feet',
  define: {
    timestamsps: true,
    underscored: true,
    underscoredAll: true,
  },
};

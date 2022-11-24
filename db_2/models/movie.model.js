module.exports = (sequelize, Sequelize) => {
  const movie = sequelize.define(
    "movies",
    {
      tmdb_id: {
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.TEXT
      },
      own: {
        type: Sequelize.INTEGER
      },
      nas: {
        type: Sequelize.INTEGER
      },
      watched: {
        type: Sequelize.INTEGER
      },
      not_watched: {
        type: Sequelize.INTEGER
      },
      // created_at: {
      //   type: Sequelize.TEXT
      // },
      // updated_at: {
      //   type: Sequelize.TEXT
      // },
    },
    {
      // schema: "movies",
      freezeTableName: true,
      createdAt: true,
      updatedAt: true,
    }
  );
  return movie;
}
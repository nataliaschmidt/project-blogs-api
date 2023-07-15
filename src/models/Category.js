/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */

const CategorySchema = (sequelize, DataTypes) => {
  const CategoryTable = sequelize.define('Category', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: DataTypes.STRING,
  }, {
    tableName: 'categories',
    underscored: true,
    timestamps: false,
  });
  return CategoryTable;
};

module.exports = CategorySchema;
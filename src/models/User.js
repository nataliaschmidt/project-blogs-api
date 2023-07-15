/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */

const UserSchema = (sequelize, DataTypes) => {
  const UserTable = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    displayName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    image: DataTypes.STRING,
  }, {
    tableName: 'users',
    underscored: true,
    timestamps: false,
  });

  UserTable.associate = ({BlogPost}) => {
    UserTable.hasMany(BlogPost, {
    foreignKey: 'userId',
    as: 'blogPosts',
    })
  }

  return UserTable
};

module.exports = UserSchema;
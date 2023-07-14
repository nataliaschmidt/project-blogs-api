/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */

const BlogPostSchema = (sequelize, DataTypes) => {
  const BlogPostTable = sequelize.define('BlogPost', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true,
    },
    published: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updated: {
      allowNull: false,
      type: DataTypes.DATE
    },
  }, {
    tableName: 'blog_posts',
    underscored: true,
    timestamps: false,
  });

  BlogPostTable.associate = ({ User }) => {
    BlogPostTable.belongsTo(User, {
      foreignKey: 'userId',
      as: 'user',
    })
  }

  return BlogPostTable
};

module.exports = BlogPostSchema;
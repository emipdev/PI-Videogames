const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4
    },
    name: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(1500),
      allowNull: false
    },
    release_date: {
      type: DataTypes.STRING
    },
    rating: {
      type: DataTypes.DECIMAL(3, 2)
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING(20)),
      allowNull: false
    },
    background_image: {
      type: DataTypes.STRING(1000)
    }
  });
};

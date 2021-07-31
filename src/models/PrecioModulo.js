export default ( sequelize, DataTypes ) => {

    const PrecioModulo = sequelize.define('t_precio_modulo', {
        id_modulo: DataTypes.INTEGER,
        id_precio: {
            type: DataTypes.INTEGER,
            primaryKey: true
        }
    }, {
        timestamps: false,
    });

    return PrecioModulo; 
}
export default (sequelize, DataTypes) => {

    const Moneda = sequelize.define('t_monedas', {
        id_moneda: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        codigo: DataTypes.STRING(10),
        moneda: DataTypes.STRING(20),
        simbolo: DataTypes.STRING(5)
    }, {
        timestamps: false,
        indexes: [{ unique: true, fields: ['codigo', 'moneda'] }]
    });

    return Moneda;
}
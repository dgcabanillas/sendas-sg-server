export default (sequelize, DataTypes) => {

    const Precio = sequelize.define('t_precios', {
        id_precio: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_monto: DataTypes.INTEGER,
        descuento: {
            type: DataTypes.REAL,
            defaultValue: 0,
            allowNull: false,
        },
        tipo_descuento: {
            type: DataTypes.ENUM( 'cantidad', 'porcentual' ),
            defaultValue: 'porcentual' 
        },
        descripcion: DataTypes.STRING(50),
        activo: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false
        }
    }, {
        timestamps: false
    });

    Precio.associate = models => {
        Precio.belongsToMany( models.CursoAperturado, {
            through: models.PrecioMatricula,
            foreignKey: 'id_precio',
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        });
        Precio.belongsToMany( models.Modulo, {
            through: models.PrecioModulo,
            foreignKey: 'id_precio',
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        });
        Precio.belongsTo( models.Monto, {
            foreignKey: 'id_monto',
            as: 'monto',
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        });
    }

    return Precio;
}
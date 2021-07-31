export default ( sequelize, DataTypes ) => {

    const Pago = sequelize.define('t_pagos', {
        id_pago: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_deuda: DataTypes.INTEGER,
        fecha_pago: DataTypes.DATEONLY,
        fecha_revision: {
            type: DataTypes.DATEONLY,
            defaultValue: null
        },
        id_monto_pagado: DataTypes.INTEGER,
        imagen_voucher: DataTypes.STRING(120),
        estado_pago: {
            type: DataTypes.ENUM('EN PROCESO', 'VERIFICADO', 'RECHAZADO'),
            defaultValue: 'EN PROCESO'
        }
    }, {
        timestamps: true,
        createdAt: 'fecha_pago',
        updatedAt: 'fecha_revision'
    });

    Pago.associate = models => {
        Pago.belongsTo( models.Monto, {
            foreignKey: {
                name: 'id_monto',
                field: 'id_monto_pagado',
            },
            as: 'monto_pagado',
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        });
    }

    return Pago; 
}
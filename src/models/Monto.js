export default (sequelize, DataTypes) => {

    const Monto = sequelize.define('t_montos', {
        id_monto: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_moneda: DataTypes.INTEGER,
        monto: {
            type: DataTypes.REAL,
            defaultValue: 0,
            allowNull: false
        },
    }, {
        timestamps: false
    });

    Monto.associate = models => {
        Monto.hasOne( models.Precio, {
            foreignKey: 'id_monto',
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        });
        Monto.belongsTo( models.Moneda, {
            foreignKey: 'id_moneda',
            as: 'moneda',
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        });
        Monto.hasOne( models.Deuda, {
            foreignKey: {
                name: 'id_monto_inicial',
                field: 'id_monto'
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        });
        Monto.hasOne( models.Deuda, {
            foreignKey: {
                name: 'id_monto_actual',
                field: 'id_monto'
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        });
        Monto.hasOne( models.Pago, {
            foreignKey: {
                name: 'id_monto_pagado',
                field: 'id_monto'
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        });
    }

    return Monto;
}
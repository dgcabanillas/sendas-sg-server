export default (sequelize, DataTypes) => {

    const Deuda = sequelize.define('t_deudas', {
        id_deuda: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_usuario: DataTypes.UUID,
        id_monto_inicial: DataTypes.INTEGER,
        id_monto_actual: DataTypes.INTEGER,
        fecha_registro: DataTypes.DATEONLY,
    }, {
        timestamps: true,
        createdAt: 'fecha_registro',
        updatedAt: false,
    });

    Deuda.associate = models => {
        Deuda.hasMany( models.Pago, {
            foreignKey: 'id_deuda',
            as: 'pagos',
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        });
        Deuda.hasOne( models.MatriculaCurso, {
            foreignKey: 'id_deuda',
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        });
        Deuda.hasOne( models.InscripcionModulo, {
            foreignKey: 'id_deuda',
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        });
        Deuda.belongsTo( models.Monto, {
            foreignKey: {
                name: 'id_monto',
                field: 'id_monto_inicial',
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        });
        Deuda.belongsTo( models.Usuario, {
            foreignKey: 'id_usuario',
            as: 'usuario',
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        });
    }

    return Deuda;
}
export default (sequelize, DataTypes) => {
    
    const EstadoCivil = sequelize.define('t_estados_civil', {
        id_estado_civil: {
            type: DataTypes.STRING(30),
            primaryKey: true
        }
    }, {
        timestamps: false,
    });

    EstadoCivil.associate = models => {
        EstadoCivil.hasMany( models.Usuario, {
            foreignKey: 'id_estado_civil',
            as: 'usuarios',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
    }

    return EstadoCivil;
}
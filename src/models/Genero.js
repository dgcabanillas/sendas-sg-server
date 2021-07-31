export default (sequelize, DataTypes) => {
    
    const Genero = sequelize.define('t_generos', {
        id_genero: {
            type: DataTypes.STRING(30),
            primaryKey: true
        }
    }, {
        timestamps: false,
    });

    Genero.associate = models => {
        Genero.hasMany( models.Usuario, {
            foreignKey: 'id_genero',
            as: 'usuarios',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
    }

    return Genero;
}
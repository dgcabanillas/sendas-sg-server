export default (sequelize, DataTypes) => {

    const Modalidad = sequelize.define('t_modalidades', {
        id_modalidad: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        modalidad: {
            type: DataTypes.STRING(40),
            allowNull: false,
            unique: true
        }
    }, {
        timestamps: false
    });

    Modalidad.associate = models => {
        Modalidad.hasMany( models.CursoAperturado, {
            foreignKey: 'id_modalidad',
            as: 'cursos_aperturados',
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        });
    };

    return Modalidad;
}
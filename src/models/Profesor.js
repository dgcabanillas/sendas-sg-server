export default (sequelize, DataTypes) => {

    const Profesor = sequelize.define('t_profesores', {
        id_registro_profesor: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_curso_aperturado: DataTypes.INTEGER,
        id_usuario: DataTypes.UUID
    }, {
        timestamps: false
    });

    Profesor.associate = models => {
        Profesor.belongsTo( models.Usuario, {
            foreignKey: 'id_usuario',
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        });
        Profesor.belongsTo( models.CursoAperturado, {
            foreignKey: 'id_curso_aperturado',
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        });
    }

    return Profesor;
}
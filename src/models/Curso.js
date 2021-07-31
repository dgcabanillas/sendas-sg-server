export default (sequelize, DataTypes) => {

    const Curso = sequelize.define('t_cursos', {
        id_curso: {
            type: DataTypes.STRING(5),
            primaryKey: true
        },
        curso: {
            type: DataTypes.STRING(80),
            allowNull: false
        },
        id_area: DataTypes.INTEGER,
        id_categoria: DataTypes.INTEGER,
        fecha_creacion: DataTypes.DATEONLY,
        fecha_edicion: DataTypes.DATEONLY,
    }, {
        timestamps: true,
        createdAt: 'fecha_creacion',
        updatedAt: 'fecha_edicion',
    });

    Curso.associate = models => {
        Curso.belongsTo( models.Categoria, {
            foreignKey: 'id_categoria',
            as: 'categoria',
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        });
        Curso.belongsTo( models.Area, {
            foreignKey: 'id_area',
            as: 'area',
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        });
        Curso.hasMany( models.CursoAperturado, {
            foreignKey: 'id_curso',
            as: 'cursos_aperturados',
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        });
    };

    return Curso;
}
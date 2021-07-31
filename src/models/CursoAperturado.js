export default (sequelize, DataTypes) => {

    const CursoAperturado = sequelize.define('t_cursos_aperturados', {
        id_curso_aperturado: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_curso: DataTypes.STRING(5),
        periodo: DataTypes.STRING(9),
        id_modalidad: DataTypes.INTEGER,
        fecha_inicio: DataTypes.DATEONLY,
        fecha_fin: DataTypes.DATEONLY,
        descripcion: DataTypes.TEXT,
        imagen: DataTypes.STRING(120),
        pdf: DataTypes.STRING(120),
        estado: {
            type: DataTypes.ENUM('ACTIVO', 'INACTIVO'),
            defaultValue: 'INACTIVO',
        },
        fecha_creacion: DataTypes.DATEONLY,
        fecha_edicion: DataTypes.DATEONLY,
    }, {
        timestamps: true,
        createdAt: 'fecha_creacion',
        updatedAt: 'fecha_edicion',
        indexes: [{ unique: true, fields: ['id_curso', 'id_modalidad', 'periodo'] }]
    });

    CursoAperturado.associate = models => {
        CursoAperturado.belongsTo( models.Curso, {
            foreignKey: 'id_curso',
            as: 'curso',
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        });
        CursoAperturado.belongsTo( models.Modalidad, {
            foreignKey: 'id_modalidad',
            as: 'modalidad',
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        });
        CursoAperturado.hasMany( models.Modulo, {
            foreignKey: 'id_curso_aperturado',
            as: 'modulos',
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        });
        CursoAperturado.belongsToMany( models.Usuario, {
            through: models.Profesor,
            foreignKey: 'id_curso_aperturado',
            as: 'profesores',
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        });
        CursoAperturado.hasMany( models.MatriculaCurso, {
            foreignKey: 'id_curso_aperturado',
            as: 'matriculas',
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        });
        CursoAperturado.belongsToMany( models.Precio, {
            through: models.PrecioMatricula,
            foreignKey: 'id_curso_aperturado',
            as: 'precios_matricula',
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        });
    };

    return CursoAperturado;
}
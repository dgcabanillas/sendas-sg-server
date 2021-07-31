export default (sequelize, DataTypes) => {

    const MatriculaCurso = sequelize.define('t_matriculas_curso', {
        id_matricula: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        id_curso_aperturado: DataTypes.INTEGER,
        id_deuda: DataTypes.INTEGER,
        fecha_matricula: DataTypes.DATEONLY
    }, {
        timestamps: true,
        createdAt: 'fecha_matricula',
        updatedAt: false,
    });

    MatriculaCurso.associate = models => {
        MatriculaCurso.belongsTo( models.CursoAperturado, {
            foreignKey: 'id_curso_aperturado',
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        });
        MatriculaCurso.belongsTo( models.Deuda, {
            foreignKey: 'id_deuda',
            as: 'deuda',
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        });
        MatriculaCurso.hasMany( models.InscripcionModulo, {
            foreignKey: 'id_matricula',
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        });
    }

    return MatriculaCurso;
}
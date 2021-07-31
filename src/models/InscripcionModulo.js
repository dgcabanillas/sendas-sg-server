export default (sequelize, DataTypes) => {

    const InscripcionModulo = sequelize.define('t_inscripciones_modulo', {
        id_inscripcion: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
        },
        id_matricula: DataTypes.INTEGER,
        id_modulo: DataTypes.INTEGER,
        id_deuda: DataTypes.INTEGER,
        fecha_inscripcion: DataTypes.DATEONLY
    }, {
        timestamps: true,
        createdAt: 'fecha_inscripcion',
        updatedAt: false
    });

    InscripcionModulo.associate = models => {
        InscripcionModulo.belongsTo( models.Deuda, {
            foreignKey: 'id_deuda',
            as: 'deuda',
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        });
        InscripcionModulo.belongsTo( models.Modulo, {
            foreignKey: 'id_modulo',
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        });
        InscripcionModulo.belongsTo( models.MatriculaCurso, {
            foreignKey: 'id_matricula',
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        });
    }

    return InscripcionModulo;
}
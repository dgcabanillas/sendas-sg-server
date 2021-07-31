export default (sequelize, DataTypes) => {

    const Modulo = sequelize.define('t_modulos', {
        id_modulo: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_curso_aperturado: DataTypes.INTEGER,
        nro_modulo: DataTypes.INTEGER,
        modulo: DataTypes.STRING(100),
        fecha_inicio: DataTypes.DATEONLY,
        fecha_fin: DataTypes.DATEONLY,
    }, {
        timestamps: false
    });

    Modulo.associate = models => {
        Modulo.belongsTo(models.CursoAperturado, {
            foreignKey: 'id_curso_aperturado',
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        });
        Modulo.belongsToMany( models.Precio, {
            through: models.PrecioModulo,
            foreignKey: 'id_modulo',
            as: 'precios_modulo',
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        });
        Modulo.hasMany(models.InscripcionModulo, {
            foreignKey: 'id_modulo',
            as: 'inscripciones',
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        });
    }

    return Modulo;
}
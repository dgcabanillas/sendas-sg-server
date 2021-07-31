export default (sequelize, DataTypes) => {

    const Categoria = sequelize.define('t_categorias', {
        id_categoria: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        categoria: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true
        }
    }, {
        timestamps: false
    });

    Categoria.associate = models => {
        Categoria.hasMany( models.Curso, {
            foreignKey: 'id_categoria',
            as: 'cursos',
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        });
    };

    return Categoria;
}
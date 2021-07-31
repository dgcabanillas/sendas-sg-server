export default (sequelize, DataTypes) => {

    const Area = sequelize.define('t_areas', {
        id_area: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        area: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true
        }
    }, {
        timestamps: false
    });

    Area.associate = models => {
        Area.hasMany( models.Curso, {
            foreignKey: 'id_area',
            as: 'cursos',
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        });
    };

    return Area;
}
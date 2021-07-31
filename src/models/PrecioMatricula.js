export default ( sequelize, DataTypes ) => {

    const PrecioMatricula = sequelize.define('t_precio_matricula', {
        id_curso_aperturado: DataTypes.INTEGER,
        id_precio: {
            type: DataTypes.INTEGER,
            primaryKey: true
        }
    }, {
        timestamps: false,
    });

    return PrecioMatricula; 
}
const data = {
    categorias: [
        {categoria: 'Pregrado'}, 
        {categoria: 'Maestría'},
        {categoria: 'Doctorado'},
        {categoria: 'Seminario'},
        {categoria: 'Conferencia'},
        {categoria: 'Charla'},
        {categoria: 'Diplomado Internacional'}
    ],
    areas: [
        {area: 'Administración y Gestión'},
        {area: 'Comercio y Marketing'},
        {area: 'Contabilidad'},
        {area: 'Audiovisual'},
        {area: 'Derecho'},
        {area: 'Desarrollo Web y Multimedia'},
        {area: 'Diseño CAD'},
        {area: 'Diseño Gráfico'},
        {area: 'Ciencias de la Computación'},                                            
        {area: 'Psicología'}
    ],
    modalidades: [
        {modalidad: 'Virtual'},
        {modalidad: 'Presencial'},
        {modalidad: 'Semipresencial'}
    ],
    cursos: [
        {id_curso: 'FP001', curso: 'Terapia y prácticas narrativas.', id_area: 10, id_categoria: 7},
        {id_curso: 'AG101', curso: 'Introducción a la economía', id_area: 1, id_categoria: 1},
        {id_curso: 'CM201', curso: 'Marketing Digital', id_area: 2, id_categoria: 1},
        {id_curso: 'WM701', curso: 'Desarrollo FullStack de Aplicaciones con JS', id_area: 6, id_categoria: 5},
        {id_curso: 'DG002', curso: 'Diseño Gráfico en tiempos de COVID', id_area: 8, id_categoria: 6},
    ],
    estadosCivil: [
        {id_estado_civil: 'soltero'},
        {id_estado_civil: 'casado'},
        {id_estado_civil: 'viudo'},
        {id_estado_civil: 'divorciado'},
    ],
    generos: [
        {id_genero: 'no especifica'},
        {id_genero: 'masculino'},
        {id_genero: 'femenino'},
    ]
};

export default data;
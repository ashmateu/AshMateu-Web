import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'p3c01d1l',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const projects = [
  {
    _id: 'project-chanel-hc',
    _type: 'project',
    title: 'Chanel Haute Couture × Marie Claire Argentina',
    slug: { _type: 'slug', current: 'chanel-hc' },
    order: 1,
    category: 'Dirección Creativa',
    location: 'Nueva York, NY',
    stripMeta: 'Dirección Creativa — Nueva York',
    localStripImage: 'images/extracted/chanel-hc/img-005.webp',
    localHeroImage: '../images/extracted/chanel-hc/img-005.webp',
    lede: 'Producir Haute Couture de Chanel para tapa no es un encargo que llega por mail. Es una relación que se construyó durante años, producción a producción, con Marie Claire Argentina.',
    blocks: [
      {
        _key: 'b1',
        heading: 'Cuando la marca te da el archivo completo',
        localImage: '../images/extracted/chanel-hc/img-000.webp',
        imageAlt: 'Chanel HC editorial',
        reversed: false,
        body: [
          { _type: 'block', _key: 'p1', style: 'normal', children: [{ _type: 'span', _key: 's1', text: 'Hay producciones en las que el acceso a la pieza es un obstáculo logístico. Con Chanel Haute Couture sucede al revés: el desafío es estar a la altura de lo que tenés en las manos.' }] },
          { _type: 'block', _key: 'p2', style: 'normal', children: [{ _type: 'span', _key: 's2', text: 'Cuatro editoriales distintas, cuatro momentos distintos, la misma premisa: mostrar Haute Couture en Nueva York sin que parezca publicidad institucional. Que se vea real, que se vea viva.' }] },
        ],
      },
      {
        _key: 'b2',
        heading: 'Nueva York como fondo, no como decorado',
        localImage: '../images/extracted/chanel-hc/img-004.webp',
        imageAlt: 'Chanel HC modelo floral',
        reversed: true,
        body: [
          { _type: 'block', _key: 'p3', style: 'normal', children: [{ _type: 'span', _key: 's3', text: 'Cada locación que elegimos tenía que tener una razón: el contraste entre la arquitectura de la ciudad y las piezas de alta costura dice algo que un estudio no puede decir.' }] },
          { _type: 'block', _key: 'p4', style: 'normal', children: [{ _type: 'span', _key: 's4', text: 'Una esquina de Manhattan a las dos de la mañana con un vestido de lentejuelas Chanel: eso es la imagen. El resto es técnica.' }] },
        ],
      },
      {
        _key: 'b3',
        heading: 'Cuatro tapas consecutivas',
        localImage: '../images/extracted/chanel-hc/img-009.webp',
        imageAlt: 'Chanel HC resultado',
        reversed: false,
        body: [
          { _type: 'block', _key: 'p5', style: 'normal', children: [{ _type: 'span', _key: 's5', text: 'La primera vez que Marie Claire Argentina publicó Chanel Haute Couture en tapa, nadie sabía si iba a funcionar para el mercado local. Funcionó. Volvimos tres veces más.' }] },
          { _type: 'block', _key: 'p6', style: 'normal', children: [{ _type: 'span', _key: 's6', text: 'Lo que construís con consistencia no se puede replicar en una producción aislada.' }] },
        ],
      },
    ],
    credits: [
      { _key: 'c1', key: 'Dirección Creativa', value: 'Ash Mateu' },
      { _key: 'c2', key: 'Publicación', value: 'Marie Claire Argentina' },
      { _key: 'c3', key: 'Marca', value: 'Chanel Haute Couture' },
      { _key: 'c4', key: 'Locación', value: 'Nueva York, NY' },
    ],
    nextProject: { _type: 'reference', _ref: 'project-valentina-ferrer' },
  },
  {
    _id: 'project-valentina-ferrer',
    _type: 'project',
    title: 'Valentina Ferrer × Miu Miu',
    slug: { _type: 'slug', current: 'valentina-ferrer' },
    order: 2,
    category: 'Editorial',
    location: 'Nueva York, NY',
    stripMeta: 'Styling — Portada — Nueva York 2023',
    localStripImage: 'images/extracted/valentina-miumiu/img-000.webp',
    localHeroImage: '../images/extracted/valentina-miumiu/img-000.webp',
    lede: 'La portada tenía que decir algo sobre volver: sofisticación sin nostalgia. Miu Miu, Nueva York, una silla y mucha luz.',
    blocks: [
      {
        _key: 'b1',
        heading: 'Miu Miu y la nueva sastrería',
        localImage: '../images/extracted/valentina-miumiu/img-002.webp',
        imageAlt: 'Valentina Ferrer Miu Miu editorial',
        reversed: false,
        body: [
          { _type: 'block', _key: 'p1', style: 'normal', children: [{ _type: 'span', _key: 's1', text: 'La colección giraba alrededor de la sastrería redefinida: chaquetas de punto con terminaciones estructuradas, shorts en negro, camisas blancas que emergían como elemento de contraste.' }] },
          { _type: 'block', _key: 'p2', style: 'normal', children: [{ _type: 'span', _key: 's2', text: 'Con Valentina el desafío siempre fue el mismo: tiene una presencia que llena el cuadro. El styling tenía que ser un soporte, no una competencia.' }] },
        ],
      },
      {
        _key: 'b2',
        heading: 'Tres accesorios, ningún accidente',
        localImage: '../images/extracted/valentina-miumiu/img-003.webp',
        imageAlt: 'Valentina Ferrer Miu Miu',
        reversed: true,
        body: [
          { _type: 'block', _key: 'p3', style: 'normal', children: [{ _type: 'span', _key: 's3', text: 'Una sola prenda de Miu Miu dice mucho. Cinco dicen demasiado. La edición fue la parte más difícil de esta producción: elegir qué sacar, no qué poner.' }] },
          { _type: 'block', _key: 'p4', style: 'normal', children: [{ _type: 'span', _key: 's4', text: 'El resultado fue la portada de mayo 2023. Una de las más vendidas de ese año.' }] },
        ],
      },
    ],
    credits: [
      { _key: 'c1', key: 'Styling', value: 'Ash Mateu' },
      { _key: 'c2', key: 'Publicación', value: 'Marie Claire Argentina' },
      { _key: 'c3', key: 'Marca', value: 'Miu Miu' },
      { _key: 'c4', key: 'Locación', value: 'Nueva York, NY' },
      { _key: 'c5', key: 'Año', value: '2023' },
    ],
    nextProject: { _type: 'reference', _ref: 'project-leonie-hanne' },
  },
  {
    _id: 'project-leonie-hanne',
    _type: 'project',
    title: 'Leonie Hanne × Dolce & Gabbana',
    slug: { _type: 'slug', current: 'leonie-hanne' },
    order: 3,
    category: 'Dirección Creativa',
    location: 'Nueva York, NY',
    stripMeta: 'Dirección Creativa — Nueva York 2024',
    localStripImage: 'images/extracted/leonie-dg/img-003.webp',
    localHeroImage: '../images/extracted/leonie-dg/img-003.webp',
    lede: '13 millones de seguidores y la seguridad de alguien que lleva mucho tiempo delante de una cámara. El trabajo fue encontrar el ángulo que todavía no había aparecido.',
    blocks: [
      {
        _key: 'b1',
        heading: 'Más allá de lo que ya se sabe de ella',
        localImage: '../images/extracted/leonie-dg/img-001.webp',
        imageAlt: 'Leonie Hanne editorial 1',
        reversed: false,
        body: [
          { _type: 'block', _key: 'p1', style: 'normal', children: [{ _type: 'span', _key: 's1', text: 'Cuando trabajás con una influencer de esa escala, hay una imagen preexistente muy definida. El feed de Leonie es impecable, pero impecable no es lo mismo que sorprendente.' }] },
          { _type: 'block', _key: 'p2', style: 'normal', children: [{ _type: 'span', _key: 's2', text: 'La propuesta fue corrernos de lo que ella ya hace muy bien para entrar en el territorio donde una producción editorial puede ir más lejos.' }] },
        ],
      },
      {
        _key: 'b2',
        heading: 'Dolce & Gabbana y la teatralidad sin exceso',
        localImage: '../images/extracted/leonie-dg/img-004.webp',
        imageAlt: 'Leonie Hanne detalle 2',
        reversed: true,
        body: [
          { _type: 'block', _key: 'p3', style: 'normal', children: [{ _type: 'span', _key: 's3', text: 'Las piezas de D&G tienen una carga visual propia. El riesgo siempre es el exceso: demasiados volúmenes, demasiado color, demasiado de todo al mismo tiempo.' }] },
          { _type: 'block', _key: 'p4', style: 'normal', children: [{ _type: 'span', _key: 's4', text: 'Trabajamos con la arquitectura de las piezas, no contra ella. Un rooftop en Brooklyn con luz de tarde hace el resto.' }] },
        ],
      },
    ],
    credits: [
      { _key: 'c1', key: 'Dirección Creativa', value: 'Ash Mateu' },
      { _key: 'c2', key: 'Publicación', value: 'Marie Claire Argentina' },
      { _key: 'c3', key: 'Marca', value: 'Dolce & Gabbana' },
      { _key: 'c4', key: 'Locación', value: 'Nueva York, NY' },
      { _key: 'c5', key: 'Año', value: '2024' },
    ],
    nextProject: { _type: 'reference', _ref: 'project-chanel-williamsburg' },
  },
  {
    _id: 'project-chanel-williamsburg',
    _type: 'project',
    title: 'Chanel Prêt-à-porter Williamsburg',
    slug: { _type: 'slug', current: 'chanel-williamsburg' },
    order: 4,
    category: 'Editorial',
    location: 'Brooklyn, Nueva York',
    stripMeta: 'Styling — Brooklyn, Nueva York',
    localStripImage: 'images/extracted/chanel-pap/img-000.webp',
    localHeroImage: '../images/extracted/chanel-pap/img-000.webp',
    lede: 'La calle como estudio tiene sus propias reglas. Aprendés a trabajar con ellas o perdés la foto.',
    blocks: [
      {
        _key: 'b1',
        heading: 'Williamsburg antes de que todo el mundo lo descubra',
        localImage: '../images/extracted/chanel-pap/img-001.webp',
        imageAlt: 'Chanel PAP modelo estudio',
        reversed: false,
        body: [
          { _type: 'block', _key: 'p1', style: 'normal', children: [{ _type: 'span', _key: 's1', text: 'La producción buscó la tensión entre lo que Chanel Prêt-à-porter propone como colección, un regreso a la sastrería con espíritu contemporáneo, y los espacios industriales de Brooklyn que todavía guardan algo de aspereza.' }] },
          { _type: 'block', _key: 'p2', style: 'normal', children: [{ _type: 'span', _key: 's2', text: 'No fue una elección decorativa. Fue una elección conceptual.' }] },
        ],
      },
      {
        _key: 'b2',
        heading: 'El skyline como tercer elemento',
        localImage: '../images/extracted/chanel-pap/img-003.webp',
        imageAlt: 'Chanel PAP close-up',
        reversed: true,
        body: [
          { _type: 'block', _key: 'p3', style: 'normal', children: [{ _type: 'span', _key: 's3', text: 'Manhattan desde el otro lado del río aparece en algunas tomas como un fondo casi imposible. No lo buscamos específicamente. Lo encontramos mientras buscábamos otra cosa.' }] },
          { _type: 'block', _key: 'p4', style: 'normal', children: [{ _type: 'span', _key: 's4', text: 'A veces la locación te da algo que no pediste y es exactamente lo que necesitabas.' }] },
        ],
      },
    ],
    credits: [
      { _key: 'c1', key: 'Styling', value: 'Ash Mateu' },
      { _key: 'c2', key: 'Publicación', value: 'Marie Claire Argentina' },
      { _key: 'c3', key: 'Marca', value: 'Chanel Prêt-à-porter' },
      { _key: 'c4', key: 'Locación', value: 'Williamsburg, Brooklyn, NY' },
    ],
    nextProject: { _type: 'reference', _ref: 'project-dolores-fonzi' },
  },
  {
    _id: 'project-dolores-fonzi',
    _type: 'project',
    title: 'Dolores Fonzi',
    slug: { _type: 'slug', current: 'dolores-fonzi' },
    order: 5,
    category: 'Celebrity Styling',
    location: 'Buenos Aires / Nueva York',
    stripMeta: 'Celebrity Styling',
    localStripImage: 'images/extracted/dolores-fonzi/img-003.webp',
    localHeroImage: '../images/extracted/dolores-fonzi/img-003.webp',
    lede: 'El trabajo fue entender cómo la ropa podía acompañarla sin competir con ella.',
    blocks: [
      {
        _key: 'b1',
        heading: 'Una actriz que ya tiene estilo',
        localImage: '../images/extracted/dolores-fonzi/img-005.webp',
        imageAlt: 'Dolores Fonzi editorial',
        reversed: false,
        body: [
          { _type: 'block', _key: 'p1', style: 'normal', children: [{ _type: 'span', _key: 's1', text: 'Hay celebrities que necesitan ser construidas visualmente desde cero. Dolores no es una de ellas. Tiene un criterio estético muy claro y una relación con la ropa que viene de adentro.' }] },
          { _type: 'block', _key: 'p2', style: 'normal', children: [{ _type: 'span', _key: 's2', text: 'Trabajar con alguien así exige otro tipo de escucha. Aportar algo sin imponer nada.' }] },
        ],
      },
      {
        _key: 'b2',
        heading: 'Negro sobre negro, sin concesiones',
        localImage: '../images/extracted/dolores-fonzi/img-004.webp',
        imageAlt: 'Dolores Fonzi BW',
        reversed: true,
        body: [
          { _type: 'block', _key: 'p3', style: 'normal', children: [{ _type: 'span', _key: 's3', text: 'La propuesta para la portada de El Planeta Urbano partió de un principio simple: negro total, estructura limpia, ninguna distracción.' }] },
          { _type: 'block', _key: 'p4', style: 'normal', children: [{ _type: 'span', _key: 's4', text: 'Dolores tiene esa capacidad de llenar el cuadro sin que la ropa trabaje de más. La fotografía en blanco y negro hizo el resto.' }] },
        ],
      },
    ],
    credits: [
      { _key: 'c1', key: 'Styling', value: 'Ash Mateu' },
      { _key: 'c2', key: 'Publicación', value: 'El Planeta Urbano' },
      { _key: 'c3', key: 'Locación', value: 'Buenos Aires / Nueva York' },
    ],
    nextProject: { _type: 'reference', _ref: 'project-calu-chinatown' },
  },
  {
    _id: 'project-calu-chinatown',
    _type: 'project',
    title: 'Calu Rivero — Chinese New Year',
    slug: { _type: 'slug', current: 'calu-chinatown' },
    order: 6,
    category: 'Editorial',
    location: 'Chinatown, Manhattan, NY',
    stripMeta: 'Styling — Chinatown, Manhattan',
    localStripImage: 'images/extracted/calu-chinatown/img-004.webp',
    localHeroImage: '../images/extracted/calu-chinatown/img-000.webp',
    lede: 'Sin control de locación, sin extras, con el desfile de dragones pasando a dos metros. Una de las producciones más libres del archivo de Marie Claire Argentina.',
    blocks: [
      {
        _key: 'b1',
        heading: 'Cuando la calle decide por vos',
        localImage: '../images/extracted/calu-chinatown/img-005.webp',
        imageAlt: 'Calu Rivero noodles Chinatown',
        reversed: false,
        body: [
          { _type: 'block', _key: 'p1', style: 'normal', children: [{ _type: 'span', _key: 's1', text: 'El Año Nuevo Chino en Chinatown no para por nadie. La producción tenía que adaptarse al ritmo del evento, no al revés. Eso significó trabajar en tiempo real: el fondo cambiaba cada cinco minutos, la gente se movía, los dragones desfilaban sin previo aviso.' }] },
          { _type: 'block', _key: 'p2', style: 'normal', children: [{ _type: 'span', _key: 's2', text: 'Calu entendió el juego desde el primer momento. Esa capacidad de estar presente en el caos es lo que hace que estas fotos tengan la energía que tienen.' }] },
        ],
      },
      {
        _key: 'b2',
        heading: 'El cerdo de peluche que no estaba en el brief',
        localImage: '../images/extracted/calu-chinatown/img-002.webp',
        imageAlt: 'Calu Rivero detalles',
        reversed: true,
        body: [
          { _type: 'block', _key: 'p3', style: 'normal', children: [{ _type: 'span', _key: 's3', text: 'Aparece en una de las tomas y se convirtió en la imagen más compartida de la producción. Nadie lo planeó. Alguien lo sostenía en la multitud, Calu lo tomó con la misma naturalidad que hubiera tomado una cartera de Chanel, y el fotógrafo disparó.' }] },
          { _type: 'block', _key: 'p4', style: 'normal', children: [{ _type: 'span', _key: 's4', text: 'La mejor foto de la producción no fue la que habíamos imaginado.' }] },
        ],
      },
    ],
    credits: [
      { _key: 'c1', key: 'Styling', value: 'Ash Mateu' },
      { _key: 'c2', key: 'Publicación', value: 'Marie Claire Argentina' },
      { _key: 'c3', key: 'Locación', value: 'Chinatown, Manhattan, NY' },
    ],
    nextProject: { _type: 'reference', _ref: 'project-netflix-mf' },
  },
  {
    _id: 'project-netflix-mf',
    _type: 'project',
    title: 'Netflix × Martín Fierro',
    slug: { _type: 'slug', current: 'netflix-mf' },
    order: 7,
    category: 'Celebrity Styling',
    location: 'Buenos Aires',
    stripMeta: 'Celebrity Styling — Red Carpet',
    localStripImage: 'images/extracted/netflix-mf/img-000.webp',
    localHeroImage: '../images/netflix-081.jpg',
    lede: 'Red carpet con toda la presión del mundo. El contexto define las decisiones casi más que el look en sí.',
    blocks: [
      {
        _key: 'b1',
        heading: 'La noche más larga del año de la moda local',
        localImage: '../images/extracted/netflix-mf/img-000.webp',
        imageAlt: 'Netflix red carpet 1',
        reversed: false,
        body: [
          { _type: 'block', _key: 'p1', style: 'normal', children: [{ _type: 'span', _key: 's1', text: 'El Martín Fierro es el momento en que todo el país mira a la industria del espectáculo argentino. Netflix llegó como nominado con una lista de actrices que representaban el nuevo cine nacional. El styling tenía que estar a la altura de ese momento.' }] },
          { _type: 'block', _key: 'p2', style: 'normal', children: [{ _type: 'span', _key: 's2', text: 'Trabajamos con Delfi Chavez, una de las apuestas más fuertes de la plataforma para la temporada. El look tenía que decir algo sobre quién era ella, no sobre la plataforma.' }] },
        ],
      },
      {
        _key: 'b2',
        heading: 'Una sola decisión que lo cambia todo',
        localImage: '../images/extracted/netflix-mf/img-004.webp',
        imageAlt: 'Netflix red carpet 2',
        reversed: true,
        body: [
          { _type: 'block', _key: 'p3', style: 'normal', children: [{ _type: 'span', _key: 's3', text: 'El vestido de encaje negro que elegimos para Delfi fue una apuesta. No era el look más seguro, no era el más obvio para el Martín Fierro. Pero era el correcto para ella.' }] },
          { _type: 'block', _key: 'p4', style: 'normal', children: [{ _type: 'span', _key: 's4', text: 'Cuando llegó al red carpet y las cámaras empezaron a seguirla, entendimos que habíamos acertado. Esa es la diferencia entre styling y costume.' }] },
        ],
      },
    ],
    credits: [
      { _key: 'c1', key: 'Styling', value: 'Ash Mateu' },
      { _key: 'c2', key: 'Evento', value: 'Martín Fierro 2022' },
      { _key: 'c3', key: 'Cliente', value: 'Netflix Argentina' },
      { _key: 'c4', key: 'Locación', value: 'Buenos Aires' },
    ],
    nextProject: { _type: 'reference', _ref: 'project-gucci-rural' },
  },
  {
    _id: 'project-gucci-rural',
    _type: 'project',
    title: 'Editorial Rural × Gucci',
    slug: { _type: 'slug', current: 'gucci-rural' },
    order: 8,
    category: 'Editorial',
    location: 'Upstate New York',
    stripMeta: 'Styling — Upstate New York',
    localStripImage: 'images/extracted/gucci-rural/img-001.webp',
    localHeroImage: '../images/extracted/gucci-rural/img-001.webp',
    lede: 'Un chancho, una cabra y piezas de Gucci. Nadie esperaba eso de una producción argentina. Eso era exactamente el punto.',
    blocks: [
      {
        _key: 'b1',
        heading: 'El lujo en el lugar incorrecto',
        localImage: '../images/extracted/gucci-rural/img-000.webp',
        imageAlt: 'Editorial Rural Gucci granja',
        reversed: false,
        body: [
          { _type: 'block', _key: 'p1', style: 'normal', children: [{ _type: 'span', _key: 's1', text: 'La propuesta conceptual era simple: tomar piezas de temporada de Gucci y ubicarlas en el contexto más alejado posible de una semana de la moda. Una granja en Upstate New York, animales reales, tierra, madera roja.' }] },
          { _type: 'block', _key: 'p2', style: 'normal', children: [{ _type: 'span', _key: 's2', text: 'La tensión entre ambos mundos es la imagen. No hay manera de hacer eso sin comprometerse con la incomodidad de esa contradicción.' }] },
        ],
      },
      {
        _key: 'b2',
        heading: 'La foto que nadie había hecho',
        localImage: '../images/extracted/gucci-rural/img-002.webp',
        imageAlt: 'Editorial Rural Gucci modelo',
        reversed: true,
        body: [
          { _type: 'block', _key: 'p3', style: 'normal', children: [{ _type: 'span', _key: 's3', text: 'La imagen del close-up del rostro de la modelo con la cabra recién nacida se convirtió en la más circulada de la producción. No porque fuera la más obvia, sino porque era la menos esperada.' }] },
          { _type: 'block', _key: 'p4', style: 'normal', children: [{ _type: 'span', _key: 's4', text: 'Mezclar Gucci con un chivito tiene sus propias reglas de composición. La primera: nunca intentar controlarlo.' }] },
        ],
      },
    ],
    credits: [
      { _key: 'c1', key: 'Styling', value: 'Ash Mateu' },
      { _key: 'c2', key: 'Marca', value: 'Gucci' },
      { _key: 'c3', key: 'Locación', value: 'Upstate New York' },
    ],
  },
];

async function migrate() {
  console.log('Migrando proyectos a Sanity...');
  const transaction = client.transaction();
  for (const project of projects) {
    transaction.createOrReplace(project);
  }
  await transaction.commit();
  console.log(`✓ ${projects.length} proyectos migrados correctamente.`);
}

migrate().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});

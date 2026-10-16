export const rentalCategories = [
  "Bonecos e Pelúcias",
  "Decorações",
  "Mesas e Decorativos",
  "Painéis e Cômodas",
] as const;

export type RentalCategory = (typeof rentalCategories)[number];

export type RentalProduct = {
  id: number;
  name: string;
  category: RentalCategory;
  image: string;
};

const dollsAndPlushies: [number, string][] = [
  [4334, "Boneco de tecido com chapéu"],
  [4332, "Dupla de bonecos de tecido"],
  [4330, "Veículos de brinquedo coloridos"],
  [4329, "Trio de carrinhos de brinquedo"],
  [4326, "Personagens de pelúcia"],
  [4324, "Ônibus e veículos de brinquedo"],
  [4322, "Motocicletas e carros de brinquedo"],
  [4320, "Boneco e acessórios de pirata"],
  [4318, "Bonecos de fantasia"],
  [4316, "Bichinhos marinhos de pelúcia"],
  [4312, "Carrinhos de personagens"],
  [4310, "Flamingo rosa de pelúcia"],
  [4308, "Bichinhos do mar de pelúcia"],
  [4306, "Casal de bonecos para festa"],
  [4304, "Trio de bonecas de tecido"],
  [4302, "Trio de tubarões de pelúcia"],
  [4300, "Trio de bonecos de tecido"],
  [4297, "Trio de bonecos infantis"],
  [4296, "Dupla de palhaços de pelúcia"],
  [4295, "Casal de personagens de fantasia"],
  [4292, "Gatinha branca de pelúcia"],
  [4288, "Bichinhos de pelúcia variados"],
  [4286, "Personagens amarelos de pelúcia"],
  [4284, "Dinossauros coloridos de pelúcia"],
  [4282, "Dupla de leões de pelúcia"],
  [4280, "Rinoceronte de pelúcia"],
  [4279, "Tigre de pelúcia"],
  [4275, "Jacarés de pelúcia"],
  [4273, "Macacos de pelúcia"],
  [4271, "Girafa de pelúcia em pé"],
  [4269, "Bicho-preguiça de pelúcia"],
  [4268, "Macaco de pelúcia"],
  [4265, "Cervo de pelúcia deitado"],
  [4263, "Girafa de pelúcia sentada"],
  [4261, "Filhote de leão de pelúcia"],
  [4258, "Jacaré de pelúcia"],
  [4256, "Tigre branco de pelúcia"],
  [4253, "Cervo de pelúcia em pé"],
  [4250, "Leão de pelúcia deitado"],
  [4244, "Onça de pelúcia"],
  [4242, "Vaquinha de pelúcia"],
];

const decorations: [number, string][] = [
  [6336, "Decoração infantil com balões coloridos"],
  [6335, "Decoração temática com personagens"],
  [6334, "Decoração de aniversário com balões e luzes"],
];

const tablesAndDecor: [number, string][] = [
  [3916, "Dupla de mesas redondas com tampos de madeira"],
  [3915, "Mesas redondas com estrutura preta"],
  [3913, "Mesas redondas rústicas"],
  [3909, "Mesa retangular de madeira rústica"],
  [3906, "Mesa baixa de madeira rústica"],
  [3894, "Módulo decorativo em formato de roda"],
  [3892, "Painel decorativo em arcos coloridos"],
  [3891, "Painel brilhante para festas"],
  [3885, "Trio de mesas redondas cor-de-rosa"],
  [3884, "Mesas metálicas com tampos de madeira"],
  [3882, "Conjunto de mesas metálicas douradas"],
  [3880, "Mesas orgânicas em tons pastel"],
  [3879, "Composição de mesas orgânicas e arco"],
  [3877, "Trio de suportes brancos com tampos de madeira"],
  [3876, "Suportes aramados decorativos"],
  [3874, "Cubos decorativos em formato de dados"],
  [3872, "Painel temático esportivo"],
  [3871, "Módulos ripados em tons pastel"],
  [3867, "Cômoda decorativa cor-de-rosa"],
  [3866, "Painel decorativo em formato de jipe"],
  [3863, "Mesas aramadas com tampos coloridos"],
  [3862, "Trio de mesas aramadas coloridas"],
];

export const rentalProducts: RentalProduct[] = [
  ...dollsAndPlushies.map(([id, name]) => ({
    id,
    name,
    category: "Bonecos e Pelúcias" as const,
    image: `/products/bonecos-pelucias/img-${id}.webp`,
  })),
  ...decorations.map(([id, name]) => ({
    id,
    name,
    category: "Decorações" as const,
    image: `/products/decoracoes/img-${id}.webp`,
  })),
  ...tablesAndDecor.map(([id, name]) => ({
    id,
    name,
    category: "Mesas e Decorativos" as const,
    image: `/products/mesas-decorativos/img-${id}.webp`,
  })),
];

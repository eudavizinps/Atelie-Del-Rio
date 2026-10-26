export const rentalCategories = [
  "Decoração",
  "Bandejas",
  "Pelúcias & Bonecos",
  "Painel",
  "Cômodas",
  "Mesas",
  "Leds",
  "Arranjos",
  "Cenários",
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
  [7001, "Decoração infantil rosa com personagens e balões"],
  [7002, "Mesa de festa em tons rosé com balões suspensos"],
  [7003, "Decoração infantil do fundo do mar em tons pastel"],
  [7004, "Decoração rosa com personagens, balões e luzes"],
  [7005, "Decoração em tons de rosa com tema marinho"],
  [7006, "Decoração delicada com carrossel e balões"],
  [7007, "Decoração infantil com balões vermelhos e verdes"],
  [6334, "Decoração de aniversário com balões e luzes"],
  [6335, "Decoração temática com personagens"],
  [6336, "Decoração infantil com balões coloridos"],
];

const trays: [number, string][] = [
  [7101, "Conjunto de suportes redondos de madeira"],
  [7102, "Conjunto de bandejas elevadas em cobre e madeira"],
  [7103, "Trio de bandejas metálicas para doces"],
  [7104, "Trio de bandejas metálicas para doces, outra vista"],
];

const tablesAndDecor: [number, string][] = [
  [3916, "Dupla de mesas redondas com tampos de madeira"],
  [3915, "Mesas redondas com estrutura preta"],
  [3913, "Mesas redondas rústicas"],
  [3909, "Mesa retangular de madeira rústica"],
  [3906, "Mesa baixa de madeira rústica"],
  [3894, "Módulo decorativo com aro de LED"],
  [3892, "Painel decorativo em arcos coloridos"],
  [3891, "Painel brilhante para festas"],
  [3885, "Trio de mesas redondas cor-de-rosa"],
  [3884, "Mesas metálicas com tampos de madeira"],
  [3882, "Conjunto de mesas metálicas douradas"],
  [3880, "Mesas orgânicas em tons pastel"],
  [3879, "Composição de mesas orgânicas e arco"],
  [3877, "Conjunto de mesas brancas com tampos de madeira"],
  [3876, "Suportes aramados decorativos"],
  [3874, "Cubos decorativos em formato de dados"],
  [3872, "Painel temático esportivo"],
  [3871, "Módulos ripados em tons pastel"],
  [3867, "Cômoda decorativa cor-de-rosa"],
  [3866, "Painel decorativo em formato de jipe"],
  [3863, "Mesas aramadas com tampos coloridos"],
  [3862, "Trio de mesas aramadas coloridas"],
];

const panelsAndChests: [number, string][] = [
  [4439, "Dinossauro e personagens espaciais em painel"],
  [4438, "Dupla de palhaços em painel"],
  [4436, "Cenário de praia com prancha e van"],
  [4434, "Personagens de aventura tropical em painel"],
  [4433, "Super-herói com letreiro em painel"],
  [4432, "Personagem aventureiro em painel"],
  [4430, "Trio de personagens amarelos em painel"],
  [4429, "Boneca com unicórnio em painel"],
  [4427, "Personagens com violão e cavalo em painel"],
  [4425, "Trio de cachorrinhos em painel"],
  [4423, "Animais de fazenda em painel"],
  [4420, "Trio de meninas em painel"],
  [4418, "Bebês e mamadeira em painel"],
  [4417, "Personagens espaciais em painel"],
  [4414, "Treinador e personagem amarelo em painel"],
  [4412, "Cartas, fichas e dados cenográficos"],
  [4410, "Trio de aves em painel"],
  [4408, "Jogadores de futebol em painel"],
  [4406, "Jogador de futebol e troféu em painel"],
  [4404, "Camisa e bola de futebol em painel"],
  [4402, "Bebidas cenográficas em painel"],
  [4400, "Turma de personagens infantis em painel"],
  [4399, "Menina e gatinha em painel"],
  [4396, "Personagens de conto de fadas em painel"],
  [4395, "Flamingo, tucano e flores cenográficas"],
  [4392, "Personagens espaciais com prancha em painel"],
  [4391, "Gatinhos e arco-íris em painel"],
  [4389, "Torre e equipe de cachorrinhos em painel"],
  [4387, "Quarteto de cachorrinhos em painel"],
  [4385, "Placas redondas de Dia dos Pais"],
  [4384, "Cenário temático de Dia dos Pais"],
  [4382, "Animais da floresta em painel"],
  [4380, "Laços cenográficos cor-de-rosa"],
  [4378, "Pato e amigos em painel"],
  [4376, "Personagens e laços de festa em painel"],
  [4375, "Turma de ratinhos em painel"],
  [4374, "Princesa oriental em painel"],
  [4370, "Grupo de princesas em painel"],
  [4367, "Casal de conto de fadas em painel"],
  [4365, "Dupla de bonecas em painel"],
  [4362, "Princesinha em painel"],
  [4360, "Trio de tubarões em painel"],
  [4356, "Princesas infantis em painel"],
  [4354, "Personagens coloridos em painel"],
  [4352, "Corais cenográficos"],
  [4350, "Conchas e estrelas-do-mar cenográficas"],
  [4348, "Animais marinhos em painel"],
  [4346, "Menino em barco cenográfico"],
  [4344, "Irmãs de conto de fadas em painel"],
  [4343, "Personagens das emoções em painel"],
  [4340, "Princesa e sete anões em painel"],
  [4338, "Quarteto de formandos em painel"],
  [4337, "Grupo de super-heróis em painel"],
  [4336, "Máscaras e acessórios de festa"],
];

// Classificação inicial do acervo; as fotos poderão ser redistribuídas por categoria.
const tableCategoryOverrides: Partial<Record<number, RentalCategory>> = {
  3894: "Leds",
  3892: "Painel",
  3891: "Painel",
  3874: "Cenários",
  3872: "Painel",
  3871: "Painel",
  3867: "Cômodas",
  3866: "Painel",
};

// A foto dos suportes aramados ainda precisa de um recorte fiel das peças.
const originalBackgroundPhotos = new Set([3876]);

const panelCategoryOverrides: Partial<Record<number, RentalCategory>> = {
  4436: "Cenários",
  4384: "Cenários",
};

export const rentalProducts: RentalProduct[] = [
  ...dollsAndPlushies.map(([id, name]) => ({
    id,
    name,
    category: "Pelúcias & Bonecos" as const,
    image: `/products/bonecos-pelucias/img-${id}.webp`,
  })),
  ...decorations.map(([id, name]) => ({
    id,
    name,
    category: "Decoração" as const,
    image: `/products/decoracoes/img-${id}.webp`,
  })),
  ...trays.map(([id, name]) => ({
    id,
    name,
    category: "Bandejas" as const,
    image: `/products/bandejas/img-${id}.webp`,
  })),
  ...tablesAndDecor.map(([id, name]) => ({
    id,
    name,
    category: tableCategoryOverrides[id] ?? "Mesas",
    image: `/products/mesas-decorativos/img-${id}.webp`,
  })),
  ...panelsAndChests.map(([id, name]) => ({
    id,
    name,
    category: panelCategoryOverrides[id] ?? "Painel",
    image: `/products/paineis-comodas/img-${id}.webp`,
  })),
].map((product) =>
  product.category === "Decoração" || originalBackgroundPhotos.has(product.id)
    ? product
    : { ...product, image: product.image.replace("/products/", "/products/white/") },
);

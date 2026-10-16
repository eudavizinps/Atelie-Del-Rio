export const rentalCategories = [
  "Bonecos e Pelúcias",
  "Decorações",
  "Mesas e Suportes",
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

export const rentalProducts: RentalProduct[] = dollsAndPlushies.map(([id, name]) => ({
  id,
  name,
  category: "Bonecos e Pelúcias",
  image: `/products/bonecos-pelucias/img-${id}.webp`,
}));

type SeedProduct = {
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
};

export const dataSeedProducts: SeedProduct[] = [
  {
    slug: "sambal-terasi-pedas-250gr",
    name: "Sambal Terasi Pedas 250gr",
    description:
      "Sambal terasi asli dengan cita rasa pedas mantap dan aroma khas terasi pilihan. Dibuat dari cabai segar, terasi berkualitas, dan bumbu alami tanpa pengawet. Cocok untuk menemani nasi panas, gorengan, hingga lauk pauk favorit Anda.",
    imageUrl:
      "https://cdn.webshopapp.com/shops/133932/files/357910736/sambal-terasi-190gr-uleg-finna.jpg",
    price: 25000,
  },
  {
    slug: "sambal-matah-bali-200gr",
    name: "Sambal Matah Bali 200gr",
    description:
      "Sambal khas Bali dengan irisan cabai segar, bawang merah, serai, dan minyak kelapa. Cocok untuk menemani ayam betutu, ikan bakar, atau nasi hangat.",
    imageUrl:
      "https://images.tokopedia.net/img/cache/700/aphluv/1997/1/1/7890655f299a49f7996d2a9c8ec2e29c~.jpeg",
    price: 27000,
  },
  {
    slug: "sambal-bawang-pedas-150gr",
    name: "Sambal Bawang Pedas 150gr",
    description:
      "Sambal bawang dengan cita rasa pedas dan gurih, terbuat dari cabai rawit pilihan dan bawang segar. Pas untuk pecinta pedas sejati.",
    imageUrl:
      "https://images.tokopedia.net/img/cache/700/aphluv/1997/1/1/145f3b06bf304c0fb230724fd62c0262~.jpeg ",
    price: 22000,
  },
  {
    slug: "sambal-ijo-padang-180gr",
    name: "Sambal Ijo Padang 180gr",
    description:
      "Sambal ijo khas Padang dengan cabai hijau segar, tomat, dan bawang. Nikmat untuk pelengkap nasi Padang dan lauk favorit Anda.",
    imageUrl:
      "https://cdn11.bigcommerce.com/s-5wf0xbtgyb/images/stencil/1280x1280/products/5963/17105/sambal-cabe-ijo-padang__18407.1715997842.jpg?c=2?imbypass=on",
    price: 25000,
  },
];

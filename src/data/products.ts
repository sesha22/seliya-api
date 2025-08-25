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
      "https://pasarsegar.co.id/wp-content/uploads/2020/07/images-67.jpegbuat",
    price: 25000,
  },
  {
    slug: "sambal-matah-bali-200gr",
    name: "Sambal Matah Bali 200gr",
    description:
      "Sambal khas Bali dengan irisan cabai segar, bawang merah, serai, dan minyak kelapa. Cocok untuk menemani ayam betutu, ikan bakar, atau nasi hangat.",
    imageUrl: "https://example.com/images/sambal-matah-bali-200gr.jpg",
    price: 27000,
  },
  {
    slug: "sambal-bawang-pedas-150gr",
    name: "Sambal Bawang Pedas 150gr",
    description:
      "Sambal bawang dengan cita rasa pedas dan gurih, terbuat dari cabai rawit pilihan dan bawang segar. Pas untuk pecinta pedas sejati.",
    imageUrl: "https://example.com/images/sambal-bawang-pedas-150gr.jpg",
    price: 22000,
  },
  {
    slug: "sambal-ijo-padang-180gr",
    name: "Sambal Ijo Padang 180gr",
    description:
      "Sambal ijo khas Padang dengan cabai hijau segar, tomat, dan bawang. Nikmat untuk pelengkap nasi Padang dan lauk favorit Anda.",
    imageUrl: "https://example.com/images/sambal-ijo-padang-180gr.jpg",
    price: 25000,
  },
];

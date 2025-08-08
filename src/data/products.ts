type Product = {
  id: number;
  name: string;
  spicy: "normal" | "super" | null;
};

export const dataProducts: Product[] = [
  {
    id: 1,
    name: "Sambal Tenar",
    spicy: "normal",
  },
  {
    id: 2,
    name: "Sambal cap Belibis",
    spicy: "super",
  },
  {
    id: 3,
    name: "Sambal SariRasa",
    spicy: "normal",
  },
  {
    id: 4,
    name: "Sambal Sedap",
    spicy: "super",
  },
];

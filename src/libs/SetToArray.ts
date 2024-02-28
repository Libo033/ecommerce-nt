import { IProduct } from "./interfaces";

export const getMarcas = (prods: IProduct[]): string[] => {
  const s: Set<string> = new Set();
  prods.forEach((p) => {
    s.add(p.marca);
  });

  return Array.from(s);
};

"use client";
import { IProduct, IProductContext } from "@/libs/interfaces";
import React, { useEffect, useState, createContext } from "react";

const productsDefault: IProduct[] = [
  {
    _id: "1",
    marca: "Jota",
    categoria: "Perfumeria",
    detalle: "Jota rojo carmesi",
    image: [
      "https://res.cloudinary.com/dsuydyqgz/image/upload/v1706882995/01-varios/rd8ntaaaq4ovveaksu9t.jpg",
    ],
    precio: 32000,
    stock: 2,
    visible: true,
    genero: "sin",
    otros: ["citrico"],
  },
];

const defaultValue: IProductContext = {
  products: productsDefault,
  loaded: false,
  createOneProduct: async (newProduct) => false,
  updateOneProduct: async (toUpdate) => false,
  deleteOneProduct: async (id) => false,
};

export const ProductContext: React.Context<IProductContext> =
  createContext(defaultValue);

export const CategoryContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [products, setProducts] = useState<IProduct[]>(productsDefault);
  const [loaded, setLoaded] = useState(false);

  const createOneProduct = async (newProduct: IProduct) => {
    return false;
  };

  const updateOneProduct = async (toUpdate: IProduct) => {
    return false;
  };

  const deleteOneProduct = async (id: string) => {
    return false;
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loaded,
        createOneProduct,
        updateOneProduct,
        deleteOneProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

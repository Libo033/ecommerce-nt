"use client";
import { IProduct, IProductContext } from "@/libs/interfaces";
import React, { useEffect, useState, createContext } from "react";

const productsDefault: IProduct[] = [
  {
    _id: "1",
    marca: "Jota",
    categoria: "Perfumeria",
    detalle: "Jota rojo carmesi",
    img: [
      "https://res.cloudinary.com/dsuydyqgz/image/upload/v1706882995/01-varios/rd8ntaaaq4ovveaksu9t.jpg",
    ],
    precio: 32000,
    stock: 2,
    mostrar: true,
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

export const ProductContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [products, setProducts] = useState<IProduct[]>(productsDefault);
  const [loaded, setLoaded] = useState(false);

  const createOneProduct = async (newProduct: IProduct) => {
    try {
      const res = await fetch(`/api/prods`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      const data: { code: number; created: boolean; id: string } =
        await res.json();

      if (data.created) {
        newProduct._id = data.id;
        setProducts([...products, newProduct]);
        return true;
      }

      return false;
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
      return false;
    }
  };

  const updateOneProduct = async (toUpdate: IProduct) => {
    try {
      const res = await fetch(`/api/prods/${toUpdate._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toUpdate),
      });
      const data: { code: number; modified: IProduct } = await res.json();

      if (data.code === 200) {
        let toEdit = products.filter((c) => c._id !== toUpdate._id);
        setProducts([...toEdit, toUpdate]);

        return true;
      }

      return false;
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
      return false;
    }
  };

  const deleteOneProduct = async (id: string) => {
    try {
      setProducts(products.filter((p) => p._id !== id));

      const res = await fetch(`/api/prods/${id}`, { method: "DELETE" });
      const data: { code: number; deleted: boolean } = await res.json();

      if (data.deleted) return true;

      return false;
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
      return false;
    }
  };

  useEffect(() => {
    fetch(`/api/prods`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProducts(data.productos);
        setLoaded(true);
      })
      .catch((err) => {
        if (err instanceof Error) {
          console.log(err.message);
        }
      });
  }, []);

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

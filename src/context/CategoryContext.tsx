"use client";
import { ICategory, ICategoryContext } from "@/libs/interfaces";
import React, { useEffect, useState, createContext } from "react";

const categoriesDefault: ICategory[] = [{ _id: "1", nombre: "Perfumeria" }];

const defaultValue: ICategoryContext = {
  categories: categoriesDefault,
  createOne: async (nombre) => false,
  updateOne: async (id, nombre) => false,
  deleteOne: async (id) => false,
};

export const CategoryContext: React.Context<ICategoryContext> =
  createContext(defaultValue);

export const CategoryContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [categories, setCategories] = useState<ICategory[]>(categoriesDefault);

  const createOne = async (nombre: string) => {
    return false;
  };

  const updateOne = async (id: string, nombre: string) => {
    return false;
  };

  const deleteOne = async (id: string) => {
    return false;
  };

  useEffect(() => {
    fetch(`/api/category`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCategories(data.categorias);
      })
      .catch((err) => {
        if (err instanceof Error) {
          console.log(err.message);
        }
      });
  }, []);

  return (
    <CategoryContext.Provider
      value={{ categories, createOne, updateOne, deleteOne }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

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
    const res = await fetch(`/api/category`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre }),
    });
    const data: { code: number; created: boolean; id: string } =
      await res.json();

    if (data.created) {
      setCategories([...categories, { _id: data.id, nombre }]);
      return true;
    }

    return false;
  };

  const updateOne = async (id: string, nombre: string) => {
    fetch(`/api/category/${id}`);
    return false;
  };

  const deleteOne = async (id: string) => {
    setCategories(categories.filter((c) => c._id !== id));

    const res = await fetch(`/api/category/${id}`, { method: "DELETE" });
    const data: { code: number; deleted: boolean } = await res.json();

    if (data.deleted) return true;

    return false;
  };

  useEffect(() => {
    fetch(`/api/category`)
      .then((res) => res.json())
      .then((data) => {
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

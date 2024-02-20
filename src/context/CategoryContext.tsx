"use client";
import { ICategory, ICategoryContext } from "@/libs/interfaces";
import React, { useEffect, useState, createContext } from "react";

const categoriesDefault: ICategory[] = [{ _id: "1", nombre: "Perfumeria" }];

const defaultValue: ICategoryContext = {
  categories: categoriesDefault,
  loaded: false,
  createOne: async (nombre) => false,
  updateOne: async (id, nombre) => false,
  deleteOne: async (id) => false,
};

export const CategoryContext: React.Context<ICategoryContext> =
  createContext(defaultValue);

export const CategoryContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [categories, setCategories] = useState<ICategory[]>(categoriesDefault);

  const createOne = async (nombre: string) => {
    try {
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
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
      return false;
    }
  };

  const updateOne = async (id: string, nombre: string) => {
    try {
      const res = await fetch(`/api/category/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre }),
      });
      const data: { code: number; modified: { _id: string; nombre: string } } =
        await res.json();

      if (data.code === 200) {
        let toEdit = categories.filter((c) => c._id !== id);
        setCategories([...toEdit, { _id: id, nombre }]);

        return true;
      }

      return false;
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
      return false;
    }
  };

  const deleteOne = async (id: string) => {
    try {
      setCategories(categories.filter((c) => c._id !== id));

      const res = await fetch(`/api/category/${id}`, { method: "DELETE" });
      const data: { code: number; deleted: boolean } = await res.json();

      if (data.deleted) return true;

      return false;
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
      return false;
    }
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

    setLoaded(true);
  }, []);

  return (
    <CategoryContext.Provider
      value={{ loaded, categories, createOne, updateOne, deleteOne }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

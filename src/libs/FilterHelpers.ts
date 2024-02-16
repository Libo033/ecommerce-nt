import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ReadonlyURLSearchParams } from "next/navigation";
import React from "react";

export const handleSetQuery = (
  filter: string,
  value: string,
  query: ReadonlyURLSearchParams,
  router: AppRouterInstance,
  setExpanded: React.Dispatch<React.SetStateAction<string | false>>
) => {
  let isFilterActive: string | null = query.get(filter);

  if (isFilterActive) {
    // BORRAR SOLO EL ELIMINADO Y NO TODO
    let ig = 0;
    for (let i = 0; i < query.toString().length; i++)
      if (query.toString()[i] === "=") ig += 1;

    if (ig >= 2) {
      router.push(
        "/prods?" +
          query.toString().replace(`${filter}=${value.toLowerCase()}`, "")
      );
    } else router.push("/prods");
  } else {
    // AGREGAR UNO O VARIOS FILTROS
    router.push(
      `/prods?${
        query.toString() === "" ? "" : query.toString() + "&"
      }${filter}=${value.toLowerCase()}`
    );
  }

  setExpanded(false);
};

export const handleSetQueryPrice = (
  query: ReadonlyURLSearchParams,
  router: AppRouterInstance,
  setExpanded: React.Dispatch<React.SetStateAction<string | false>>
) => {
  let ig = 0;
  for (let i = 0; i < query.toString().length; i++) {
    if (query.toString()[i] === "=") ig += 1;
  }
  let min =
    parseFloat((document.getElementById("desde") as HTMLInputElement).value) ||
    0;
  let max =
    parseFloat((document.getElementById("hasta") as HTMLInputElement).value) ||
    0;
  let isFilterActive: string | null = query.get("min" || "max");

  if (isFilterActive) {
    // FILTRO ACTIVO = BORRAR
    if (ig === 2) router.push("/prods");
    else {
      //min=0&max=0
      router.push(
        `/prods?${query
          .toString()
          .replace(`${ig > 2 ? "&" : ""}min=${min}&max=${max}`, "")}`
      );
    }
    (document.getElementById("desde") as HTMLInputElement).value = "";
    (document.getElementById("hasta") as HTMLInputElement).value = "";
  } else {
    // FILTRO INACTIVO = ROUTER PUSH
    router.push(
      `/prods?${
        query.toString() ? query.toString() + "&" : ""
      }min=${min}&max=${max}`
    );
  }

  setExpanded(false);
};

"use client";
import React, { useState } from "react";
import {
  ArrowForward,
  ArrowForwardIosSharp,
  AttachMoney,
} from "@mui/icons-material";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  OutlinedInputProps,
  TextField,
  styled,
} from "@mui/material";
import styles from "./page.module.css";
import { useRouter, useSearchParams } from "next/navigation";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharp sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "#fff",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const Filter = () => {
  const router = useRouter();
  const query = useSearchParams();
  const [expanded, setExpanded] = useState<string | false>("");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const handleSetQuery = (filter: string, value: string) => {
    let isFilterActive: string | null = query.get(filter);

    if (isFilterActive) {
      // BORRAR SOLO EL ELIMINADO Y NO TODO
      let ig = 0;
      for (let i = 0; i < query.toString().length; i++) {
        if (query.toString()[i] === "=") ig += 1;
      }

      if (ig >= 2) {
        router.push(
          "/prods?" +
            query.toString().replace(`${filter}=${value.toLowerCase()}`, "")
        );
      } else {
        router.push("/prods");
      }
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

  const handleSetQueryPrice = () => {
    let ig = 0;
    for (let i = 0; i < query.toString().length; i++) {
      if (query.toString()[i] === "=") ig += 1;
    }
    let min =
      parseFloat(
        (document.getElementById("desde") as HTMLInputElement).value
      ) || 0;
    let max =
      parseFloat(
        (document.getElementById("hasta") as HTMLInputElement).value
      ) || 0;
    let isFilterActive: string | null = query.get("min" || "max");

    if (isFilterActive) {
      // FILTRO ACTIVO = BORRAR
      if (ig === 2) {
        router.push("/prods");
      } else {
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

  const categorias = ["Cabello", "Perfumeria"];
  const marcas = ["Jota", "Am", "BBVA"];

  let inputProps: Partial<OutlinedInputProps> = {
    startAdornment: (
      <InputAdornment position="start">
        <AttachMoney />
      </InputAdornment>
    ),
  };

  return (
    <>
      <Accordion
        style={{ marginTop: "18px" }}
        expanded={expanded === "1"}
        onChange={handleChange("1")}
      >
        <AccordionSummary>Categoria</AccordionSummary>
        <AccordionDetails>
          <ul className={styles.List}>
            {categorias.length > 0 &&
              categorias.map((c) => (
                <li
                  key={c}
                  style={
                    query.get("categoria") === null
                      ? { display: "block" }
                      : query.get("categoria") === c.toLowerCase()
                      ? undefined
                      : { display: "none" }
                  }
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={query.get("categoria") === c.toLowerCase()}
                      />
                    }
                    label={c}
                    onClick={() => handleSetQuery("categoria", c)}
                  />
                </li>
              ))}
          </ul>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === "2"} onChange={handleChange("2")}>
        <AccordionSummary>Marca</AccordionSummary>
        <AccordionDetails>
          <ul className={styles.List}>
            {marcas.length > 0 &&
              marcas.map((m) => (
                <li
                  key={m}
                  style={
                    query.get("marca") === null
                      ? { display: "block" }
                      : query.get("marca") === m.toLowerCase()
                      ? undefined
                      : { display: "none" }
                  }
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={query.get("marca") === m.toLowerCase()}
                      />
                    }
                    label={m}
                    onClick={() => handleSetQuery("marca", m)}
                  />
                </li>
              ))}
          </ul>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === "3"} onChange={handleChange("3")}>
        <AccordionSummary>Rango de Precio</AccordionSummary>
        <AccordionDetails>
          <div style={{ display: "flex", gap: "12px" }}>
            <div>
              <FormLabel htmlFor="desde">Desde</FormLabel>
              <TextField
                size="small"
                id="desde"
                placeholder="0,00"
                type="number"
                InputProps={inputProps}
                sx={{ backgroundColor: "#fff", marginTop: "6px" }}
              />
            </div>
            <div>
              <FormLabel htmlFor="hasta">Hasta</FormLabel>
              <TextField
                size="small"
                id="hasta"
                type="number"
                placeholder="0,00"
                InputProps={inputProps}
                sx={{ backgroundColor: "#fff", marginTop: "6px" }}
              />
            </div>
          </div>
          <Button
            onClick={() => handleSetQueryPrice()}
            sx={{ marginTop: "9px" }}
            variant="outlined"
            fullWidth
          >
            filtrar
          </Button>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default Filter;

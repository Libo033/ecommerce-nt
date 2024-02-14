"use client";
import React, { useState } from "react";
import { ArrowForwardIosSharp } from "@mui/icons-material";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { Checkbox, FormControlLabel, styled } from "@mui/material";
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

  const categorias = ["Cabello", "Perfumeria"];
  const marcas = ["Jota", "Am", "BBVA"];

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
    </>
  );
};

export default Filter;

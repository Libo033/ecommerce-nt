"use client";
import React, { useContext, useState } from "react";
import { ArrowForwardIosSharp, AttachMoney } from "@mui/icons-material";
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
import { handleSetQuery, handleSetQueryPrice } from "@/libs/FilterHelpers";
import { CategoryContext } from "@/context/CategoryContext";
import { ProductContext } from "@/context/ProductsContext";

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
  const { categories } = useContext(CategoryContext);
  const { marcas } = useContext(ProductContext);
  const router = useRouter();
  const query = useSearchParams();
  const [expanded, setExpanded] = useState<string | false>("");

  const handleChange = (panel: string) => (e: any, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  const inputProps: Partial<OutlinedInputProps> = {
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
            {categories.length > 0 &&
              categories.map((c) => (
                <li
                  key={c._id}
                  style={
                    query.get("categoria") === null
                      ? { display: "block" }
                      : query.get("categoria") === c.nombre.toLowerCase()
                      ? undefined
                      : { display: "none" }
                  }
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={
                          query.get("categoria") === c.nombre.toLowerCase()
                        }
                      />
                    }
                    label={c.nombre}
                    onClick={() =>
                      handleSetQuery(
                        "categoria",
                        c.nombre,
                        query,
                        router,
                        setExpanded
                      )
                    }
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
                    onClick={() =>
                      handleSetQuery("marca", m, query, router, setExpanded)
                    }
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
            onClick={() => handleSetQueryPrice(query, router, setExpanded)}
            sx={{ marginTop: "9px" }}
            variant="outlined"
            fullWidth
          >
            {query.get("min" || "max") ? "reset" : "filter"}
          </Button>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default Filter;

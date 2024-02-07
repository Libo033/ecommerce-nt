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
  const [expanded, setExpanded] = useState<string | false>("");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const categorias = ["Cabello", "Perfumeria"];
  const marcas = ["Jota", "Am", "BBVA"];

  return (
    <>
      <Accordion expanded={expanded === "1"} onChange={handleChange("1")}>
        <AccordionSummary>Categoria</AccordionSummary>
        <AccordionDetails>
          <ul className={styles.List}>
            {categorias.length > 0 &&
              categorias.map((c) => (
                <li key={c}>
                  <FormControlLabel control={<Checkbox />} label={c} />
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
                <li key={m}>
                  <FormControlLabel control={<Checkbox />} label={m} />
                </li>
              ))}
          </ul>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default Filter;

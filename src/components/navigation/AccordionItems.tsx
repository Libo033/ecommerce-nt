"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import { ArrowForwardIosSharp } from "@mui/icons-material";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { useRouter } from "next/navigation";
import { styled } from "@mui/material";

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

const AccordionItems: React.FC<{
  items: Array<{
    _id: string;
    categoria: string;
    opciones: Array<{ _id: string; info: string }>;
  }>;
}> = ({ items }) => {
  const router = useRouter();
  const [expanded, setExpanded] = useState<string | false>("");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <>
      {items.length > 0 &&
        items.map((i) => (
          <Accordion
            expanded={expanded === i._id}
            onChange={handleChange(i._id)}
          >
            <AccordionSummary>{i.categoria}</AccordionSummary>
            <AccordionDetails sx={{ backgroundColor: "#fff" }}>
              <ul className={styles.List}>
                {i.opciones.length > 0 &&
                  i.opciones.map((o) => (
                    <li
                      onClick={() =>
                        router.push(
                          `/prods/${i.categoria.toLowerCase()}?by=${o._id}`
                        )
                      }
                    >
                      {o.info}
                    </li>
                  ))}
                <li
                  onClick={() =>
                    router.push(`/prods/${i.categoria.toLowerCase()}`)
                  }
                >
                  Ver todo en {i.categoria}
                </li>
              </ul>
            </AccordionDetails>
          </Accordion>
        ))}
    </>
  );
};

export default AccordionItems;

/*
      <Accordion expanded={expanded === "2"} onChange={handleChange("2")}>
        <AccordionSummary>Cabello</AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: "#fff" }}>
          <ul className={styles.List}>
            <li onClick={() => router.push("/")}>Para lavar</li>
            <li onClick={() => router.push("/")}>Para tratar</li>
          </ul>
        </AccordionDetails>
      </Accordion> 
*/

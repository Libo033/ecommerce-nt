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
import { ICategory } from "@/libs/interfaces";

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

const AccordionItems: React.FC<{ items: ICategory[] }> = ({ items }) => {
  const router = useRouter();
  const [expanded, setExpanded] = useState<string | false>("");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <>
      {items.map((i) => (
        <Accordion
          key={i._id}
          expanded={expanded === i._id}
          onChange={handleChange(i._id)}
        >
          <AccordionSummary>{i.nombre}</AccordionSummary>
          <AccordionDetails sx={{ backgroundColor: "#fff" }}>
            <ul className={styles.List}>
              <li
                onClick={() => router.push(`/prods/${i.nombre.toLowerCase()}`)}
              >
                Ver todo en {i.nombre}
              </li>
            </ul>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

export default AccordionItems;

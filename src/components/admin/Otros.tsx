import React from "react";
import styles from "./page.module.css";
import { Button, Chip, OutlinedTextFieldProps, TextField } from "@mui/material";
import { Add, Close } from "@mui/icons-material";

const Otros: React.FC<{
  otros: string[];
  setOtros: React.Dispatch<React.SetStateAction<string[]>>;
  textFieldProps: Partial<OutlinedTextFieldProps>;
}> = ({ otros, setOtros, textFieldProps }) => {
  const handleAddOtros = () => {
    const n = (document.getElementById("otros") as HTMLInputElement).value;
    setOtros([...otros, n]);
  };

  const handleDeleteOtros = (otro: string) => {
    setOtros(otros.filter((o) => o !== otro));
  };

  return (
    <>
      <div className={styles.ModalProduct_Otros}>
        <TextField
          id="otros"
          fullWidth
          sx={{ margin: "9px 0px" }}
          {...textFieldProps}
          label="Otros"
        />
        <Button
          onClick={() => handleAddOtros()}
          sx={{ margin: "9px 0px" }}
          variant="outlined"
          size="small"
        >
          <Add />
        </Button>
      </div>
      <div className={styles.ModalBadgeContainer}>
        {otros.length > 0 &&
          otros.map((o) => (
            <Chip
              key={o}
              label={
                <div
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <p>{o}</p>
                  <Close
                    onClick={() => handleDeleteOtros(o)}
                    sx={{ fontSize: "17px", cursor: "pointer" }}
                  />
                </div>
              }
            />
          ))}
      </div>
    </>
  );
};

export default Otros;

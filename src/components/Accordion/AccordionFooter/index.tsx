import React from "react";
import Typography from "@mui/material/Typography";

type AFProps = {
  value: string;
};

const AccordionFooter = ({ value = "" }: AFProps) => {
  return (
    <>
      <Typography
        sx={{
          fontWeight: 700,
          marginTop: "1rem",
          backgroundColor: "aliceblue",
          padding: "1rem",
          borderRadius: "5px",
          width: "100%",
        }}
      >
        {value}
      </Typography>
    </>
  );
};

export default AccordionFooter;

import React from "react";
import Typography from "@mui/material/Typography";
import "./styles.css";

type TProps = {
  projectName: string;
  grandTotalPayment: string;
};

const AccordionSummary = ({ projectName, grandTotalPayment }: TProps) => (
  <>
    <div className="accordion-summary-container">
      <Typography
        sx={{
          fontWeight: 700,
        }}
      >
        {projectName}
      </Typography>
      <Typography
        sx={{
          fontWeight: 700,
        }}
      >{`TOTAL : ${grandTotalPayment} USD`}</Typography>
    </div>
  </>
);

export default AccordionSummary;

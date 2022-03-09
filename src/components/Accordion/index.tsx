import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import "./style.css";

type TAccrodionProps = {
  children: JSX.Element;
  Component: JSX.Element;
};

export default function SimpleAccordion({
  children,
  Component,
}: TAccrodionProps) {
  return (
    <>
      <Accordion className="root-accordion">
        <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
          {Component}
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
    </>
  );
}

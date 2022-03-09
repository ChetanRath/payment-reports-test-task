import React from "react";
import { Box, Typography } from "@mui/material";
import { GenericTableData } from "util/common.types";
import { colors } from "./donut.common";
import "./style.css";

const DonutHead = ({ data }: { data: GenericTableData[] }) => (
  <div className="rootDonutHeadHeat">
    <div className="rootDonutHeat">
      {data.map((element: GenericTableData, index: number) => {
        return (
          <div className="rootDonutHeat">
            <Box
              sx={{
                width: 30,
                height: 30,
                backgroundColor: `${colors[index]}`,
              }}
            ></Box>
            <Typography
              sx={{
                paddingLeft: 5,
                paddingRight: 5,
                fontsize: 18,
              }}
            >
              {element.label}
            </Typography>
          </div>
        );
      })}
    </div>
  </div>
);

export default DonutHead;

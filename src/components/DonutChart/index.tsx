import React, { useRef } from "react";
import drawChart from "./drawChart";
import { GenericTableData } from "util/common.types";
import "./style.css";

const DonutChart = ({ data }: { data: GenericTableData[] }) => {
  const ref = useRef(null);
  if (ref.current) drawChart(ref.current, data);
  return (
    <div className="container">
      <div className="graph" ref={ref} />
    </div>
  );
};

export default React.memo(DonutChart);

import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import SimpleTable from "components/SimpleTable";
import Select from "components/Select";
import DateSelector from "components/Date";
import ChartComponent from "components/DonutChart";
import CustomAccordion from "components/Accordion";
import CustomisedTableRow from "components/Accordion/AccordionSummary";
import AccordionFooter from "components/Accordion/AccordionFooter";
import DonutHead from "components/DonutChart/donutHead";
import AccordionHeader from "components/Accordion/AccordionHeader";
import { totalsGenerator } from "util/helper";
import useReport from "./useReport";
import { itemType } from "./typings";

const Report = () => {
  const {
    isLoading,
    formatProjectData,
    projectValue,
    gatewayLoading,
    formatGatewayData,
    gateWayValue,
    displayGateway,
    tableHead,
    accordionData,
    donutChart,
    projectData,
    gatewayData,
    grandTotal,
    selectGateway,
    selectFromDate,
    selectToDate,
    handleReport,
    selectProject,
  } = useReport();
  return (
    <>
      <div className="tableMainContent">
        <div className="tableContent">
          <Typography
            variant="h5"
            component="h2"
            sx={{ marginRight: "15rem", fontSize: 24, fontWeight: 500 }}
          >
            Reports
          </Typography>
          <Box component="span" sx={{ display: "block", fontSize: 20 }}>
            Easily generate a report of your transactions
          </Box>
        </div>
        {isLoading ? (
          <CircularProgress disableShrink />
        ) : (
          formatProjectData && (
            <Select
              initialLabel="All project"
              selectData={formatProjectData}
              handleChange={selectProject}
              value={projectValue}
            />
          )
        )}

        {gatewayLoading ? (
          <CircularProgress disableShrink />
        ) : (
          formatGatewayData && (
            <Select
              initialLabel="All Gateways"
              selectData={formatGatewayData}
              handleChange={selectGateway}
              value={gateWayValue}
            />
          )
        )}
        <DateSelector initialLabel="From date" handleChange={selectFromDate} />
        <DateSelector initialLabel="To date" handleChange={selectToDate} />
        <Button variant="contained" disableElevation onClick={handleReport}>
          Generate Report
        </Button>
      </div>
      <Grid container sx={{ marginTop: "2rem" }}>
        <Grid
          item
          xs={12}
          md={displayGateway ? 6 : 12}
          sx={{ backgroundColor: "aliceblue", borderRadius: "12px" }}
        >
          <AccordionHeader header={tableHead} />
          {accordionData === null ? (
            <CircularProgress disableShrink />
          ) : (
            accordionData &&
            accordionData.map((item: itemType) =>
              projectData !== null && gatewayData !== null ? (
                <SimpleTable rows={item.data} />
              ) : (
                <CustomAccordion
                  Component={
                    <CustomisedTableRow
                      grandTotalPayment={totalsGenerator(item.data)}
                      projectName={item.projectName}
                    />
                  }
                  key={`accordion-${Math.random()}`}
                >
                  <SimpleTable rows={item.data} />
                </CustomAccordion>
              )
            )
          )}
        </Grid>

        {displayGateway ? (
          <Grid item xs={12} md={6}>
            <DonutHead data={donutChart} />
            <ChartComponent data={donutChart} />
            <AccordionFooter value={`GATEWAY TOTAL : ${grandTotal} USD`} />
          </Grid>
        ) : (
          ""
        )}
        {displayGateway ? null : (
          <AccordionFooter value={`TOTAL : ${grandTotal} USD`} />
        )}
      </Grid>
    </>
  );
};

export default Report;

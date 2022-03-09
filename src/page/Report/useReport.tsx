/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useMemo, useCallback } from "react";
import moment from "moment";
import reverse from "lodash/reverse";
import useAsyncFn from "hooks/useAsync";
import { totalsGenerator } from "util/helper";
import { fetchDetailedData, fetchProj, fetchGate } from "util/apis";
import {
  GenericTableData,
  rowsType,
  TDateTarget,
  TDateTargetStateAction,
  TReport,
  TProjectData,
  TGatewayData,
} from "util/common.types";
import { itemType } from "./typings";
import {
  gatewayDataType,
  projectAPIType,
  tableFormatType,
  TDataFormat,
  TAccordionData,
  TFormatData,
} from "./typings";

const useReport = () => {
  const [projectData, setProjectData] = useState(null);
  const [gatewayData, setGatewayData] = useState(null);
  const [projectValue, setProjectValue] = useState(null);
  const [gateWayValue, setGateWayValue] = useState(null);
  const [fromDateValue, setFromDateValue] = useState(null);
  const [toDateValue, setToDateValue] = useState(null);
  const [formatGatewayData, setFormatGatewayData] = useState<TDataFormat[]>([]);
  const [formatProjectData, setFormatProjectData] = useState<TDataFormat[]>([]);
  const [accordionData, setAccordionData] = useState<TAccordionData[]>([]);
  const [donutChart, setDonutChart] = useState<GenericTableData[]>([]);
  const [tableHead, setTableHead] = useState<string>(
    "All projects | All gateways"
  );
  const [grandTotal, setGrandTotal] = useState<number>(0);
  const {
    isLoading,
    res: projData,
    asyncFunc: fetchProjects,
  }: projectAPIType<TProjectData> = useAsyncFn(fetchProj);
  const {
    isLoading: gatewayLoading,
    res: dataGateway,
    asyncFunc: fetchGateways,
  }: projectAPIType<TGatewayData> = useAsyncFn(fetchGate);

  const { res: tableData, asyncFunc: fetchTableData }: projectAPIType<TReport> =
    useAsyncFn(fetchDetailedData);

  useEffect(() => {
    fetchProjects();
    fetchGateways();
    fetchTableData({
      from: "",
      to: "",
      projectId: "",
      gatewayId: "",
    });
  }, []);

  useEffect(() => {
    if (projData.data !== undefined) {
      setFormatProjectData(
        (projData.data as TProjectData).map(({ projectId, name }) => ({
          id: projectId,
          name: name,
          type: "project",
        }))
      );
    }
  }, [projData.data]);

  useEffect(() => {
    if (dataGateway.data !== undefined) {
      setFormatGatewayData(
        dataGateway.data.map(({ gatewayId, name }: gatewayDataType) => ({
          id: gatewayId,
          name: name,
          type: "gateway",
        }))
      );
    }
  }, [dataGateway.data]);

  const headerProcessor = (
    projectData: string | null,
    gatewayData: string | null
  ) => {
    if (projectData === null && gatewayData === null)
      setTableHead("All projects | All gateways");
    else if (projectData === null && gatewayData !== null)
      setTableHead(`All projects |  ${handleName(gatewayData)}`);
    else if (projectData !== null && gatewayData === null)
      setTableHead(` ${handleName(projectData)} | All gateways`);
    else if (projectData !== null && gatewayData !== null)
      setTableHead(` ${handleName(projectData)} |  ${handleName(gatewayData)}`);
    else setTableHead(` ${projectData} |  ${gatewayData}`);
  };

  const handleReport = () => {
    setProjectData(projectValue);
    setGatewayData(gateWayValue);
    fetchTableData({
      from:
        fromDateValue === null
          ? ""
          : moment(fromDateValue).format("YYYY-MM-DD"),
      to: toDateValue === null ? "" : moment(toDateValue).format("YYYY-MM-DD"),
      projectId: projectValue === null ? "" : projectValue,
      gatewayId: gateWayValue === null ? "" : gateWayValue,
    });
    headerProcessor(projectValue, gateWayValue);
  };

  const displayGateway = useMemo(() => {
    if (
      (projectData !== null && gatewayData !== null) ||
      (projectData === null && gatewayData === null)
    )
      return false;
    return true;
  }, [projectData, gatewayData]);

  const handleName = useCallback(
    (id: string) => {
      let formattedData: TDataFormat[] = [];
      if (formatProjectData) {
        formattedData = formatProjectData.concat(formatGatewayData);
      }
      if (formattedData) {
        const nameData = formattedData.find((e: TDataFormat) => e.id === id);
        return nameData?.name;
      }
    },
    [formatGatewayData, formatProjectData]
  );

  const handleDataFormat = useCallback(
    (baseData: { data: TFormatData[]; total: number }) => {
      if (formatProjectData) {
        let gTotal = 0;
        let accordionCData = Array.from(
          new Set(
            baseData.data.map(({ projectId, gatewayData }: TFormatData) =>
              projectValue === projectId ? gatewayData : projectId
            )
          )
        ).map((data: string) => {
          const datas = baseData.data.filter(
            ({ projectId, gatewayData }: TFormatData) =>
              projectId === data || gatewayData === data
          );
          const total = totalsGenerator(datas as rowsType[]);
          gTotal += parseInt(total, 10);
          return {
            projectName: handleName(data) || "",
            data: datas as rowsType[],
            total,
          };
        });
        setAccordionData(reverse(accordionCData));
        setGrandTotal(gTotal);
      }
    },
    [formatProjectData, gatewayData, handleName, projectData]
  );

  useEffect(() => {
    if (tableData.data !== undefined) {
      let total = 0;
      const formattedTableData = (tableData.data as TReport).map(
        ({
          amount,
          projectId,
          gatewayId,
          created,
          paymentId,
        }: tableFormatType) => {
          total += amount;
          return {
            paymentId,
            projectId,
            gatewayData: gatewayId,
            data: [
              { label: "Date", value: moment(created).format("MM/DD/YYYY") },
              { label: "Gateway", value: handleName(gatewayId) },
              { label: "Transaction ID", value: paymentId },
              { label: "Amount", value: amount },
            ],
          };
        }
      );
      handleDataFormat({ data: formattedTableData, total });
    }
  }, [handleDataFormat, handleName, tableData]);

  useEffect(() => {
    if (accordionData) {
      const donut = accordionData.map((item: itemType) => ({
        label: item.projectName,
        value: totalsGenerator(item.data),
      }));
      setDonutChart(donut);
    }
  }, [accordionData]);

  const selectProject = (target: TDateTarget) =>
    setProjectValue(target as TDateTargetStateAction);

  const selectGateway = (target: TDateTarget) =>
    setGateWayValue(target as TDateTargetStateAction);

  const selectFromDate = (target: TDateTarget) =>
    setFromDateValue(target as TDateTargetStateAction);

  const selectToDate = (target: TDateTarget) =>
    setToDateValue(target as TDateTargetStateAction);

  return {
    isLoading,
    projectData,
    gatewayData,
    formatProjectData,
    projectValue,
    gatewayLoading,
    formatGatewayData,
    gateWayValue,
    displayGateway,
    tableHead,
    accordionData,
    grandTotal,
    donutChart,
    selectGateway,
    selectFromDate,
    selectToDate,
    handleReport,
    handleName,
    selectProject,
  };
};

export default useReport;

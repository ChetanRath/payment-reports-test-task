import { GenericTableData, rowsType } from "./common.types";

export const totalsGenerator = (rows: rowsType[]) => {
  let total = 0;
  rows.forEach((row) =>
    row.data.forEach((item: GenericTableData) => {
      if (item.label === "Amount") total += parseInt(item.value, 10);
    })
  );
  return total.toFixed(2);
};

export const totalDonutValue = (data: GenericTableData[]) => {
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    sum += parseInt(data[i].value, 10);
  }
  return sum;
};
export const calculatePercentage = (total: number, value: number) => {
  let num = (value / total) * 100;
  return num.toFixed(2);
};

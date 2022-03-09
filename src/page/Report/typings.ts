import { rowsType, ApiResponse } from "util/common.types";

export type gatewayDataType = {
  name: string;
  gatewayId: string;
};

export type tableFormatType = {
  amount: number;
  projectId: string;
  gatewayId: string;
  created: string;
  paymentId: string;
};

export type projectAPIType<T> = {
  isLoading: boolean;
  res: ApiResponse<T>;
  asyncFunc: Function;
};

export type itemType = {
  data: rowsType[];
  projectName: string;
};

export type TDataFormat = {
  id: string;
  name: string;
  type: string;
};

export type TAccordionData = {
  projectName: string;
  data: rowsType[];
  total: string;
};

export type TFormatData = {
  paymentId: string;
  projectId: string;
  gatewayData: string;
  data: (
    | {
        label: string;
        value: string | undefined;
      }
    | {
        label: string;
        value: number;
      }
  )[];
};

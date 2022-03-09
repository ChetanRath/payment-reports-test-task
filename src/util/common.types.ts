import React from "react";

export type GenericTableData = { label: string; value: string };

export type rowsType = {
  data: GenericTableData[];
  projectId: string;
  paymentId: string;
  gatewayData: string;
};

export type GenericObject = {
  [key: string]: string;
};

export type TDateTarget = HTMLInputElement | null;

export type TDateTargetStateAction = React.SetStateAction<null>;

export type TReportData = {
  paymentId: string;
  amount: number;
  projectId: string;
  gatewayId: string;
  userIds: string[];
  modified: string;
  created: string;
};

export type TReport = TReportData[];

export type TProject = {
  projectId: string;
  userIds: string[];
  rule: string;
  gatewayIds: string[];
  structure: string;
  industry: string;
  website: string;
  description: string;
  image: string;
  name: string;
};

export type TProjectData = TProject[];

export type TGateway = {
  gatewayId: string;
  userIds: string[];
  name: string;
  type: string;
  apiKey: string;
  secondaryApiKey: string;
  description: string;
};

export type TGatewayData = TGateway[];

export type ApiResponse<T> = {
  code: string;
  err: null;
  data: T;
};

export type TAsyncGenericState<T> = {
  isLoading: boolean;
  err: null;
  res: ApiResponse<T>;
};

export type TGenericDataType = any;

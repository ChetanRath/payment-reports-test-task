import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { TDateTarget } from "util/common.types";
import "./style.css";

type DateType = {
  initialLabel: string;
  handleChange: (e: TDateTarget) => void;
};

export default function DateSelector({ initialLabel, handleChange }: DateType) {
  const [value, setValue] = React.useState<Date | null>(null);
  const handleChangeDate = (target: Date | null) => {
    handleChange(target as TDateTarget);
  };

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      onChange={handleChangeDate(value)}
    >
      <DatePicker
        label={initialLabel}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => (
          <TextField {...params} helperText={params?.inputProps?.placeholder} />
        )}
      />
    </LocalizationProvider>
  );
}

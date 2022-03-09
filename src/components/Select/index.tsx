import * as React from "react";
import {
  SelectUnstyled,
  SelectUnstyledProps,
  selectUnstyledClasses,
} from "@mui/base/";
import OptionUnstyled from "@mui/base/OptionUnstyled";
import { styled } from "@mui/system";

type SelectType = {
  initialLabel: string;
  selectData: mapType[];
  handleChange: (e: HTMLInputElement | null) => void;
  value: HTMLInputElement | null | undefined;
};
type mapType = {
  name: string;
  id: string;
  type: string;
};

const StyledButton = styled("button")(
  ({ theme }) => `
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    min-height: calc(1.5em + 22px);
    min-width: 135px;
    background: #1BC5BD;
    border: 1px solid #fff;
    border-radius: 5px;
    margin: 0.5em;
    padding: 10px;
    text-align: left;
    line-height: 1.5;
    color: #fff;
  
  
    &.${selectUnstyledClasses.expanded} {
      &::after {
        content: '▴';
      }
    }
  
    &::after {
      content: '▾';
      float: right;
    }
    `
);

const StyledListbox = styled("ul")(
  ({ theme }) => `
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    padding: 5px;
    margin: 1px 0;
    min-width: 135px;
    background: #1BC5BD;
    border: 1px solid #fff;
    border-radius: 5px;
    color: #fff;
    overflow: auto;
    outline: 0px;
    text-align: left;
    `
);

const StyledOption = styled(OptionUnstyled)(
  ({ theme }) => `
    list-style: none;
    padding: 8px;
    border-radius: 0.45em;
    cursor: default;
  
    &:last-of-type {
      border-bottom: none;
    }  
    `
);

const CustomSelect = React.forwardRef(function CustomSelect<TValue>(
  props: SelectUnstyledProps<TValue>
) {
  const components: SelectUnstyledProps<TValue>["components"] = {
    Root: StyledButton,
    Listbox: StyledListbox,
    ...props.components,
  };

  return <SelectUnstyled {...props} components={components} />;
}) as <TValue>(
  props: SelectUnstyledProps<TValue> & React.RefAttributes<HTMLUListElement>
) => JSX.Element;

const Select = ({
  initialLabel,
  selectData,
  handleChange,
  value,
}: SelectType) => {
  return (
    <CustomSelect defaultValue={null} onChange={handleChange} value={value}>
      <StyledOption value={null}>{initialLabel}</StyledOption>
      {selectData.map(({ name, id }: mapType) => (
        <StyledOption value={id} key={id}>
          {name}
        </StyledOption>
      ))}
    </CustomSelect>
  );
};

export default Select;

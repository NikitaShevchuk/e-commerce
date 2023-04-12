import { type InputBaseComponentProps } from "@mui/material";
import { type FieldError } from "react-hook-form";

export interface FieldProps {
    inputProps: InputBaseComponentProps;
    fieldError: FieldError | undefined;
    overwriteLabel?: string;
}

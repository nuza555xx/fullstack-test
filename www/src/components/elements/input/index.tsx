import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormHelperText,
  IconButton,
  InputAdornment,
  SxProps,
  TextField,
  Theme,
} from "@mui/material";
import { InputHTMLAttributes, useState, ChangeEvent, MouseEvent } from "react";
import styles from "@utils/styles/_variables.module.scss";
import { FieldHookConfig, useField } from "formik";

class InputProps {
  id?: string = "";
  label?: string = "";
  type?: InputHTMLAttributes<unknown>["type"] = "text";
  error?: boolean = true;
  helperText?: string = "";
  endAdornment?: string | JSX.Element;
  sx?: SxProps<Theme>;
}

export default function CustomInput({
  label,
  id,
  type,
  error,
  helperText,
  endAdornment,
  sx,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [field, meta] = useField<InputProps>(
    (props as FieldHookConfig<any>) ?? {}
  );

  function handleClickShowPassword() {
    setShowPassword((show) => !show);
  }

  function handleMouseDownPassword(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
  }

  return (
    <>
      <TextField
        id={id}
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        label={label}
        sx={sx}
        size="small"
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          inputMode: ([
            "none",
            "text",
            "tel",
            "url",
            "email",
            "numeric",
            "decimal",
            "search",
          ].find((e) => e === type) ?? "text") as any,
          endAdornment:
            type === "password" ? (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ) : (
              endAdornment
            ),
        }}
        {...field}
        {...props}
        error={Boolean(meta.touched && meta.error)}
        helperText={""}
      />
      <FormHelperText
        sx={{ fontSize: styles.defaultFontSizeHelper }}
        error={error}
      >
        {helperText}
      </FormHelperText>
    </>
  );
}

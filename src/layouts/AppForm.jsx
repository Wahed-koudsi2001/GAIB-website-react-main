import { DesktopDatePicker } from "@mui/x-date-pickers";
import { Grid, InputAdornment, MenuItem, TextField } from "@mui/material";
import { eList, eUseState, eUseTranslation } from "react-e-utils";
import dayjs from "dayjs";

export const AppMuiInput = ({
  name,
  type = "text",
  label,
  initValue,
  placeholder,
  required,
  startIcon,
  endIcon,
  cols = { xs: 12 },
  sx,

  min,
  step,
  max,
  minLength,
  maxLength,
  accept,
  multiple = false,
  pattern,
}) => {
  const value = eUseState(initValue ?? "");

  return (
    <Grid item {...cols}>
      <TextField
        name={name}
        type={type}
        label={label}
        required={required}
        placeholder={placeholder}
        value={value.value}
        onChange={(event) => {
          value.value = event.target.value;
        }}
        size="small"
        margin="dense"
        fullWidth
        InputProps={{
          startAdornment: startIcon && (
            <InputAdornment position="start" children={startIcon} />
          ),
          endAdornment: endIcon && (
            <InputAdornment position="end" children={endIcon} />
          ),
          sx: { py: 1, height: "auto" },
        }}
        inputProps={{
          style: { height: "auto" },
          min,
          step,
          max,
          minLength,
          maxLength,
          accept,
          multiple,
          pattern,
        }}
        sx={sx}
      />
    </Grid>
  );
};

export const AppMuiInputPhone = ({
  name,
  label,
  initValue,
  placeholder,
  required,
  startIcon,
  endIcon,
  cols = { xs: 12 },
  sx,

  minLength,
  maxLength,
  pattern,
}) => {
  const { forDir } = eUseTranslation();
  const value = eUseState(initValue ?? "");

  return (
    <Grid item {...cols}>
      <TextField
        name={name}
        type={"tel"}
        label={label}
        required={required}
        placeholder={placeholder}
        value={value.value}
        onChange={(event) => {
          value.value = event.target.value;
        }}
        size="small"
        margin="dense"
        fullWidth
        InputProps={{
          startAdornment: startIcon && (
            <InputAdornment position="start" children={startIcon} />
          ),
          endAdornment: endIcon && (
            <InputAdornment position="end" children={endIcon} />
          ),
          sx: { py: 1, height: "auto" },
        }}
        inputProps={{
          style: { height: "auto", textAlign: forDir("start", "end") },
          minLength,
          maxLength,
          pattern,
        }}
        sx={sx}
      />
    </Grid>
  );
};

export const AppMuiInputNumber = ({
  name,
  label,
  initValue,
  placeholder,
  required,
  startIcon,
  endIcon,
  cols = { xs: 12 },
  sx,

  min,
  step,
  max,
  minLength,
  maxLength,
  pattern,
}) => {
  const value = eUseState(initValue ?? "");

  return (
    <Grid item {...cols}>
      <TextField
        name={name}
        type={"number"}
        label={label}
        required={required}
        placeholder={placeholder}
        value={value.value}
        onChange={(event) => {
          value.value = event.target.value;
        }}
        size="small"
        margin="dense"
        fullWidth
        InputProps={{
          startAdornment: startIcon && (
            <InputAdornment position="start" children={startIcon} />
          ),
          endAdornment: endIcon && (
            <InputAdornment position="end" children={endIcon} />
          ),
          sx: { py: 1, height: "auto" },
        }}
        inputProps={{
          style: { height: "auto" },
          min,
          step,
          max,
          minLength,
          maxLength,
          pattern,
        }}
        sx={sx}
      />
    </Grid>
  );
};

export const AppMuiInputEmail = ({
  name,
  label,
  initValue,
  placeholder,
  required,
  startIcon,
  endIcon,
  cols = { xs: 12 },
  sx,

  minLength,
  maxLength,
  pattern,
}) => {
  const value = eUseState(initValue ?? "");

  return (
    <Grid item {...cols}>
      <TextField
        name={name}
        type={"email"}
        label={label}
        required={required}
        placeholder={placeholder}
        value={value.value}
        onChange={(event) => {
          value.value = event.target.value;
        }}
        size="small"
        margin="dense"
        fullWidth
        InputProps={{
          startAdornment: startIcon && (
            <InputAdornment position="start" children={startIcon} />
          ),
          endAdornment: endIcon && (
            <InputAdornment position="end" children={endIcon} />
          ),
          sx: { py: 1, height: "auto" },
        }}
        inputProps={{
          style: { height: "auto" },
          minLength,
          maxLength,
          pattern,
        }}
        sx={sx}
      />
    </Grid>
  );
};

export const AppMuiInputDate = ({
  name,
  label,
  initValue,
  placeholder,
  required,
  startIcon,
  openTo = "year",
  format = "DD-MM-YYYY",
  cols = { xs: 12 },
  sx,
  minDate,
  maxDate,
}) => {
  const value = eUseState(initValue ? dayjs(initValue) : null);

  return (
    <Grid item {...cols}>
      <DesktopDatePicker
        name={name}
        label={label}
        required={required}
        placeholder={placeholder}
        value={value.value}
        onChange={(v) => {
          value.value = v;
        }}
        format={format}
        openTo={openTo}
        minDate={minDate}
        maxDate={maxDate}
        views={["year", "month", "day"]}
        slotProps={{
          textField: {
            required: required,
            size: "small",
            margin: "dense",
            fullWidth: true,
            InputProps: {
              startAdornment: startIcon && (
                <InputAdornment position="start" children={startIcon} />
              ),
              // endAdornment: endIcon && (
              //   <InputAdornment position="end" children={endIcon} />
              // ),
              sx: { py: 1, height: "auto" },
            },
            inputProps: {
              style: { height: "auto" },
            },
          },
        }}
        sx={{ ...sx, width: "100%" }}
      />
    </Grid>
  );
};

export const AppMuiSelect = ({
  name,
  label,
  initValue,
  required,
  startIcon,
  endIcon,
  cols = { xs: 12 },
  sx,

  options,
  valueKey = "value",
  labelKey = "label",

  onChange = (value) => {},
}) => {
  const value = eUseState(initValue ?? "");

  return (
    <Grid item {...cols}>
      <TextField
        select={true}
        name={name}
        label={label}
        required={required}
        value={value.value}
        onChange={(event) => {
          value.value = event.target.value;
          if (onChange) onChange(event.target.value);
        }}
        size="small"
        margin="dense"
        fullWidth
        InputProps={{
          startAdornment: startIcon && (
            <InputAdornment position="start" children={startIcon} />
          ),
          endAdornment: endIcon && (
            <InputAdornment position="end" children={endIcon} />
          ),
          sx: { py: 1, height: "auto" },
        }}
        inputProps={{ style: { height: "auto" } }}
        children={eList.toArray(options, (i, item) => (
          <MenuItem
            key={`so-${i}`}
            value={item?.[valueKey] ?? ""}
            children={item?.[labelKey] ?? ""}
          />
        ))}
        SelectProps={{
          displayEmpty: true,
        }}
        sx={sx}
      />
    </Grid>
  );
};

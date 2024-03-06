import { Step, StepLabel, Stepper } from "@mui/material";
import { eList } from "react-e-utils";

const AppStepper = ({ active, contents }) => {
  return (
    <>
      <Stepper
        activeStep={active}
        orientation={"horizontal"}
        sx={{ pb: 3, width: "100%" }}
      >
        {eList.generateArray(contents.length, (i) => {
          return (
            <Step key={`as-${i}`} completed={active > i}>
              <StepLabel />
            </Step>
          );
        })}
      </Stepper>
      <div style={{ flexGrow: 1, width: "100%" }}> {contents?.[active]}</div>
    </>
  );
};
export default AppStepper;

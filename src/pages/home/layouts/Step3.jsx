import { eList, eUseState, eUseTranslation } from "react-e-utils";
import { useCallback } from "react";
import HealthForm from "./HealthForm";
import { Checkbox, FormControlLabel, FormGroup, Grid } from "@mui/material";

const Step3 = ({
  activeStep,
  nextStep,
  prevStep,
  data,
  pushData,
  deps,
}) => {
  const { t, forLocale } = eUseTranslation();
  const limit = eUseState(null);

  console.log(deps);

  const pdata = useCallback((key) => {
    return deps?.plans_data.find((o) => o.id === key);
  }, [deps]);

  const pvdata = useCallback((key) => {
    return pdata(key)
      ? eList.sortArr(pdata(key)?.plans_data_values, false, (o) =>
        parseInt(o?.["order_by"])
      )
      : [];
  }, [pdata]);

  const options = useCallback((key) => {
    return eList.toArray(pvdata(key), (index, item) => {
      return {
        value: item.id,
        label: item?.[forLocale({ ar: "name_alt" }, "name")],
      };
    });
  }, [forLocale, pvdata]);

  return (
    <HealthForm
      onSubmit={(fd) => {
        pushData(eList.formDataToObj(fd));
        nextStep();
      }}
      title={t("Car Data")}
      back={true}
      onBack={() => {
        prevStep();
      }}
      next={true}
    >
      {eList.toArray(pvdata("homeBenefits"), (index, item) => {
        return (
          <Grid key={`cl-${item.id}`} item xs={6} md={4}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    name={`homeBenefits[]`}
                    value={item.id}
                    {...(item.always_checked === 1 ? { checked: true } : {})}
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                  />
                }
                label={item?.[forLocale({ ar: "name_alt" }, "name")]}
              />
            </FormGroup>
          </Grid>
        );
      })}
    </HealthForm>
  );
};
export default Step3;

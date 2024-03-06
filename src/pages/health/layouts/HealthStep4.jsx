import { eList, eUseState, eUseTranslation } from "react-e-utils";
import { AppMuiSelect } from "../../../layouts/AppForm";
import { FaArrowTrendUp } from "react-icons/fa6";
import { useCallback } from "react";
import HealthForm, { HealthFormBody } from "./HealthForm";
import {
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
} from "@mui/material";

const HealthStep4 = ({
  activeStep,
  nextStep,
  prevStep,
  data,
  pushData,
  deps,
}) => {
  const { t, forLocale } = eUseTranslation();
  const limit = eUseState(null);

  const pdata = useCallback(() => {
    return deps?.plans_data.find((o) => o.id === "healthLimit");
  }, [deps]);

  const pvdata = useCallback(() => {
    return pdata()
      ? eList.sortArr(pdata()?.plans_data_values, false, (o) =>
          parseInt(o?.["order_by"])
        )
      : [];
  }, [pdata]);

  const options = useCallback(() => {
    return eList.toArray(pvdata(), (index, item) => {
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
      title={t("annual_limit")}
      back={true}
      onBack={() => {
        prevStep();
      }}
      next={true}
    >
      <AppMuiSelect
        name={pdata()?.id}
        label={t("annual_limit")}
        required={true}
        startIcon={<FaArrowTrendUp />}
        initValue={data?.[pdata()?.id]}
        options={options()}
        onChange={(val) => {
          limit.value = val;
        }}
      />

      <Grid item xs={12} sx={{ pt: 2 }}>
        <Divider />
      </Grid>

      <HealthStep5
        {...{
          limit: limit.value,
          deps,
        }}
      />
    </HealthForm>
  );
};
export default HealthStep4;

const HealthStep5 = ({ limit, deps }) => {
  const { t, forLocale } = eUseTranslation();

  const pdata = useCallback(() => {
    return deps?.plans_data.find((o) => o.id === "healthBenefits");
  }, [deps]);

  const pvdata = useCallback(() => {
    var array = pdata()
      ? eList.sortArr(pdata()?.plans_data_values, false, (o) =>
          parseInt(o?.["order_by"])
        )
      : [];

    if (limit) {
      var plans = eList.toArray(
        eList.findAllInArr(deps?.curr_plans_data, (i, item) => {
          return item?.plan_data_value_id === limit;
        }),
        (i, item) => {
          return item?.plan_id;
        }
      );
      var pvd = eList.toArray(
        eList.findAllInArr(deps?.curr_plans_data, (i, item) => {
          return plans.includes(item?.plan_id);
        }),
        (i, item) => {
          return item?.plan_data_value_id;
        }
      );
      array = eList.findAllInArr(array, (i, item) => pvd.includes(item?.id));
    }

    return array;
  }, [deps, pdata, limit]);

  return (
    <Grid item xs={12} sx={{ pt: 2 }}>
      <HealthFormBody title={t("health_benefits")}>
        {eList.toArray(pvdata(), (index, item) => {
          return (
            <Grid key={`cl-${item.id}`} item xs={6} md={4}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      name={`${pdata()?.id}[]`}
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
      </HealthFormBody>
    </Grid>
  );
};

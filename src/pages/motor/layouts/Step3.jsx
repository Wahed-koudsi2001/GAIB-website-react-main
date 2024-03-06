import { eList, eUseState, eUseTranslation } from "react-e-utils";
import { AppMuiSelect } from "../../../layouts/AppForm";
import { useCallback } from "react";
import { PiPercentLight } from "react-icons/pi";
import HealthForm from "./HealthForm";
import { IoCarSportOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";

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

  console.log(deps)

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
      <AppMuiSelect
        name={pdata()?.id}
        placeholder={t("Car Brands")}
        label={t("Car Brands")}
        required={true}
        startIcon={<IoCarSportOutline />}
        initValue={data?.[pdata()?.id]}
        options={options("motorBrands")}
        onChange={(val) => {
          limit.value = val;
        }}
      />

      <AppMuiSelect
        name={pdata()?.id}
        label={t("Motor Deductibles")}
        placeholder={t("Motor Deductibles")}
        required={true}
        startIcon={<PiPercentLight />}
        initValue={data?.[pdata()?.id]}
        options={options("motorDeductibles")}
        onChange={(val) => {
          limit.value = val;
        }}
      />

      <AppMuiSelect
        name={pdata()?.id}
        placeholder={t("Manufacture Year")}
        label={t("Manufacture Year")}
        required={true}
        startIcon={<SlCalender />}
        initValue={data?.[pdata()?.id]}
        options={options("motorManufactureYear")}
        onChange={(val) => {
          limit.value = val;
        }}
      />
    </HealthForm>
  );
};
export default Step3;

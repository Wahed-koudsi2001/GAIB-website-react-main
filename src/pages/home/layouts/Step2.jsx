import { Typography } from "@mui/material";
import { eList, eUseTranslation } from "react-e-utils";
import { FaDownLeftAndUpRightToCenter } from "react-icons/fa6";
import {
  AppMuiInput,
  AppMuiInputEmail,
  AppMuiInputNumber,
  AppMuiSelect,
} from "../../../layouts/AppForm";
import { FaRegBuilding, FaSearchDollar, FaMapMarkerAlt } from "react-icons/fa";
import HealthForm from "./HealthForm";
import { MdEmail } from "react-icons/md";

const Step2 = ({ activeStep, nextStep, prevStep, data, pushData }) => {
  const { t } = eUseTranslation();
  return (
    <HealthForm
      onSubmit={(fd) => {
        pushData(eList.formDataToObj(fd));
        nextStep();
      }}
      back={true}
      onBack={() => {
        prevStep();
      }}
      next={true}
    >
      <Typography variant="h4" gutterBottom>
        {t("main_person_data")}
      </Typography>
      <AppMuiInputEmail
        name="email"
        label={t("email")}
        placeholder={t("email_hint")}
        startIcon={<MdEmail />}
        required={false}
        initValue={data?.["email"]}
      />
      <AppMuiSelect
        name="Type"
        label={t("Type")}
        required={true}
        startIcon={<FaDownLeftAndUpRightToCenter />}
        options={[
          { value: "Owner", label: t("Owner") },
          { value: "Tenant", label: t("Tenant") },
        ]}
        initValue={data?.["gender"]}
      />
      <AppMuiInputNumber
        name="Builing price"
        label={t("Builing price")}
        placeholder={t("Builing price")}
        startIcon={<FaRegBuilding />}
        required={true}
        initValue={data?.["phone"]}
      />
      <AppMuiInputNumber
        name="Content price"
        label={t("Content price")}
        placeholder={t("Content price")}
        startIcon={<FaSearchDollar />}
        required={true}
        initValue={data?.["phone"]}
      />
      <AppMuiInput
        name="Address"
        label={t("Address")}
        placeholder={t("Address")}
        startIcon={<FaMapMarkerAlt />}
        required={true}
        initValue={data?.["name"]}
      />
    </HealthForm>
  );
};
export default Step2;
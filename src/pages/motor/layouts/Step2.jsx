import { Typography } from "@mui/material";
import { eList, eUseTranslation } from "react-e-utils";
import {
  AppMuiInputDate,
  AppMuiInputEmail,
  AppMuiInputPhone,
  AppMuiSelect,
} from "../../../layouts/AppForm";
import { FaBirthdayCake, FaAddressCard, FaSearchDollar } from "react-icons/fa";
import { IoMaleFemaleOutline } from "react-icons/io5";
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
      <AppMuiInputDate
        style={{ padding: "10px" }}
        name="birthdate"
        label={t("birthdate")}
        startIcon={<FaBirthdayCake />}
        required={true}
        initValue={data?.["birthdate"]}
      />
      <AppMuiSelect
        name="gender"
        label={t("gender")}
        required={true}
        startIcon={<IoMaleFemaleOutline />}
        options={[
          { value: "male", label: t("male") },
          { value: "female", label: t("female") },
        ]}
        initValue={data?.["gender"]}
      />
      <AppMuiSelect
        name="Licenced"
        label={t("Licenced")}
        required={true}
        startIcon={<FaAddressCard />
        }
        options={[
          { value: "Licenced", label: t("Licenced") },
          { value: "Unlicenced", label: t("Unlicenced") },
        ]}
        initValue={data?.["Licenced"]}
      />
      <AppMuiInputPhone
        name="Market Value"
        label={t("Market Value")}
        placeholder={t("Market Value")}
        startIcon={<FaSearchDollar />}
        required={true}
        type="number"
        initValue={data?.["Market Value"]}
      />
    </HealthForm>
  );
};
export default Step2;
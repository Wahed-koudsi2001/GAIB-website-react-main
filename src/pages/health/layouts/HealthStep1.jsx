import { eList, eUseTranslation } from "react-e-utils";
import { AppMuiInput, AppMuiInputPhone } from "../../../layouts/AppForm";
import { FaUser, FaMobile } from "react-icons/fa";
import HealthForm from "./HealthForm";
const HealthStep1 = ({
  activeStep,
  nextStep,
  prevStep,
  data,
  pushData,
  createLead,
}) => {
  const { t } = eUseTranslation();
  return (
    <HealthForm
      onSubmit={(fd) => {
        let d = pushData(eList.formDataToObj(fd));
        createLead({ name: d.name, phone: d.phone });
        nextStep();
      }}
      title={t("main_person_data")}
      next={true}
    >
      <AppMuiInput
        name="name"
        label={t("fullname")}
        placeholder={t("fullname_hint")}
        startIcon={<FaUser />}
        required={true}
        initValue={data?.["name"]}
      />
      <AppMuiInputPhone
        name="phone"
        label={t("phone_number")}
        placeholder={t("phone_number_hint")}
        startIcon={<FaMobile />}
        required={true}
        initValue={data?.["phone"]}
      />
    </HealthForm>
  );
};
export default HealthStep1;

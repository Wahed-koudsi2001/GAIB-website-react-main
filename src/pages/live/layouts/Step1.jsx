import { eList, eUseTranslation } from "react-e-utils";
import { AppMuiInput, AppMuiInputDate, AppMuiInputEmail, AppMuiInputNumber, AppMuiInputPhone, AppMuiSelect } from "../../../layouts/AppForm";
import { FaSearchDollar, FaUser, FaMobile, FaBriefcase, FaCommentDollar, FaFileInvoiceDollar, FaBirthdayCake } from "react-icons/fa";
import HealthForm from "./HealthForm";
import { MdEmail } from "react-icons/md";
import { IoMaleFemaleOutline } from "react-icons/io5";
import { MdOutlineAssistWalker } from "react-icons/md";


const Step1 = ({
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
      <AppMuiInputEmail
        name="email"
        label={t("email")}
        placeholder={t("email_hint")}
        startIcon={<MdEmail />}
        required={false}
        initValue={data?.["email"]}
      />
      <AppMuiInputPhone
        name="phone"
        label={t("phone_number")}
        placeholder={t("phone_number_hint")}
        startIcon={<FaMobile />}
        required={true}
        initValue={data?.["phone"]}
      />
      <AppMuiInput
        name="Occupation"
        label={t("Occupation")}
        placeholder={t("Occupation")}
        startIcon={<FaBriefcase />}
        required={true}
        initValue={data?.["Occupation"]}
      />
      <AppMuiInputNumber
        name="Insured amount"
        label={t("Insured amount")}
        placeholder={t("Insured amount")}
        startIcon={<FaCommentDollar />}
        required={true}
        initValue={data?.["phone"]}
      />
      <AppMuiInputNumber
        name="Premium amount in case of Invsetment"
        label={t("Premium amount in case of Invsetment")}
        placeholder={t("Premium amount in case of Invsetment")}
        startIcon={<FaFileInvoiceDollar />}
        required={true}
        initValue={data?.["phone"]}
      />
      <AppMuiInputDate
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
      <AppMuiInput
        multiline
        name="Disabilities"
        label={t("Disabilities")}
        placeholder={t("Disabilities")}
        startIcon={<MdOutlineAssistWalker />}
        required={true}
        initValue={data?.["name"]}
      />
      <AppMuiInput
        multiline
        name="Terms"
        label={t("Terms")}
        placeholder={t("Terms")}
        startIcon={<FaSearchDollar />}
        required={true}
        initValue={data?.["name"]}
      />
    </HealthForm>
  );
};
export default Step1;

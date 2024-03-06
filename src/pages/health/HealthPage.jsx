import { eUseApiState, eUseState, eUseTranslation } from "react-e-utils";
import { FaHospitalUser } from "react-icons/fa";
import AppModal from "../../layouts/AppModal";
import { ApisEB } from "../../configs";
import AppStepper from "../../layouts/AppStepper";
import HealthStep1 from "./layouts/HealthStep1";
// import HealthStep2 from "./layouts/HealthStep2";
import HealthStep3 from "./layouts/HealthStep3";
import HealthStep4 from "./layouts/HealthStep4";
// import HealthStep5 from "./layouts/HealthStep5";
import HealthStep6 from "./layouts/HealthStep6";

const HealthPage = () => {
  const { t } = eUseTranslation();

  const healthDeps = eUseApiState(ApisEB, "client/health/dependants", {
    autoCall: true,
  });
  const healthQQ = eUseApiState(ApisEB, "client/health/quick-quotation2");
  const healthReq = eUseApiState(ApisEB, "client/health/request");
  const healthLead = eUseApiState(ApisEB, "client/health/lead");

  const lead = eUseState(false);
  const leadProps = {
    leadCreated: lead.value,
    createLead: ({ name, phone }) => {
      if (lead.value === false) {
        healthLead.call({
          bodyData: {
            user_name: name,
            phone: phone,
          },
        });
        lead.value = true;
      }
    },
  };

  const active = eUseState(0);
  const activeProps = {
    activeStep: active.value,
    nextStep: () => (active.value = active.value + 1),
    prevStep: () => (active.value = active.value - 1),
  };
  const data = eUseState({});
  const dataProps = {
    data: data.value,
    pushData: (d) => {
      const obj = { ...data.value, ...d };
      data.value = obj;
      return obj;
    },
    setData: (d) => (data.value = d),
  };

  return (
    <AppModal title={t("health")} icon={<FaHospitalUser />}>
      <AppStepper
        active={active.value}
        contents={[
          <HealthStep1 {...activeProps} {...dataProps} {...leadProps} />,
          <HealthStep3 {...activeProps} {...dataProps} />,
          <HealthStep4
            {...activeProps}
            {...dataProps}
            deps={healthDeps.value}
          />,
          <HealthStep6
            {...activeProps}
            {...dataProps}
            deps={healthDeps.value}
            healthReq={healthReq}
            healthQQ={healthQQ}
          />,
        ]}
      />
    </AppModal>
  );
};
export default HealthPage;

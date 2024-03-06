import { eUseApiState, eUseState, eUseTranslation } from "react-e-utils";
import { ApisEB } from "../../configs";
import AppModal from "../../layouts/AppModal";
import AppStepper from "../../layouts/AppStepper";
import { FaHospitalUser } from "react-icons/fa";
import Step1 from "./layouts/Step1";
import Step2 from "./layouts/Step2";
import Step3 from "./layouts/Step3";
import Step4 from "./layouts/Step4";

function HomePage() {
    const { t } = eUseTranslation();

    const healthDeps = eUseApiState(ApisEB, "client/home/dependants", {
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
        <AppModal title={t("Home Insurance")} icon={<FaHospitalUser />}>
            <AppStepper
                active={active.value}
                contents={[
                    <Step1 {...activeProps} {...dataProps} {...leadProps} />,
                    <Step2 {...activeProps} {...dataProps} />,
                    <Step3
                        {...activeProps}
                        {...dataProps}
                        deps={healthDeps.value}
                    />,
                    <Step4
                        {...activeProps}
                        {...dataProps}
                        deps={healthDeps.value}
                        healthReq={healthReq}
                        healthQQ={healthQQ}
                    />,
                ]}
            />
        </AppModal>
    )
}

export default HomePage

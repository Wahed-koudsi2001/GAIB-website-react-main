import { eDate, eList, eUseState, eUseTranslation } from "react-e-utils";
import HealthForm from "./HealthForm";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import HealthPrice from "./HealthPrice";
import { cloneElement, useEffect } from "react";
import { CheckCircleTwoTone, InfoTwoTone } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Step4 = ({
  activeStep,
  nextStep,
  prevStep,
  data,
  pushData,
  deps,
  healthReq,
  healthQQ,
}) => {
  const { t } = eUseTranslation();
  const UID = eUseState(null);
  const dialog = eUseState(false);

  // get data and call api
  useEffect(() => {
    var fd = new FormData();
    fd.set("user_name", data.name);
    fd.set("phone", data.phone);
    // add main persons
    fd.append("name[]", data.name);
    fd.append("age[]", eDate.parseDate(data.birthdate, "dmy").age);
    // add other persons
    if (data.person_name) {
      for (let i in data.person_name) {
        fd.append("name[]", data.person_name[i]);
        fd.append(
          "age[]",
          eDate.parseDate(data.person_birthdate[i], "dmy").age
        );
      }
    }
    // limit
    fd.set("healthLimit", data.healthLimit);
    for (let i in data.healthBenefits) {
      fd.append("healthBenefits[]", data.healthBenefits[i]);
    }
    //
    healthQQ.call({
      bodyData: fd,
      onSuccess: ({ message, data: response }) => {
        UID.value = response?.UID;
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function chooseHealthPolicy(item) {
    var fd = new FormData();
    fd.set("UID", UID.value);
    fd.set("organization_id", item.org_id);
    fd.set("plan_id", item.plan_id);
    fd.set("data_type", item.data_type);
    // add main persons
    fd.append("name[]", data.name);
    fd.append("age[]", eDate.parseDate(data.birthdate, "dmy").age);
    fd.append("gender[]", data.gender);
    fd.append("relation[]", "self");
    fd.append("price[]", item.persons?.[0].amount);
    // add other persons
    if (data.person_name) {
      for (var i in data.person_name) {
        i = parseInt(i);
        fd.append("name[]", data.person_name[i]);
        fd.append(
          "age[]",
          eDate.parseDate(data.person_birthdate[i], "dmy").age
        );
        fd.append("gender[]", data.person_gender[i]);
        fd.append("relation[]", data.person_relation[i]);
        fd.append("price[]", item.persons?.[i + 1].amount);
      }
    }
    healthReq.call({
      bodyData: fd,
      onSuccess: ({ message, data: response }) => {
        dialog.value = true;
      },
      onError: ({ message, data }) => {
        console.log(message, data);
      },
    });
  }

  return (
    <HealthForm
      onSubmit={(fd) => { }}
      title={t("list_of_health")}
      back={true}
      onBack={() => {
        prevStep();
      }}
    >
      {healthQQ?.value?.prices?.length > 0 &&
        eList.toArray(
          eList.sortArr(
            healthQQ?.value?.prices,
            true,
            (o) => o?.healthBenefits?.length
          ),
          (index, item) => {
            return (
              <HealthPrice
                key={`giodfupjsk-${index}`}
                item={item}
                onChoosePolicy={chooseHealthPolicy}
              />
            );
          }
        )}

      {healthQQ.value?.prices?.length === 0 && (
        <Grid item xs={12}>
          <Typography
            variant="h5"
            color="text.primary"
            textAlign={"center"}
            sx={{ width: "100%", py: 10 }}
          >
            {t("empty_health_results")}
          </Typography>
        </Grid>
      )}

      <Backdrop open={healthReq.waiting || healthQQ.waiting}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <MyDialogWidget
        open={dialog.value}
        icon={<CheckCircleTwoTone />}
        content={t("health_request_success")}
        actions={[
          MyDialogAction({
            onClick: () => (window.location.href = "../"),
            text: t("back"),
            flex: 12,
          }),
        ]}
      />
    </HealthForm>
  );
};
export default Step4;

export const MyDialogWidget = ({
  open,
  onClose,
  maxWidth = "xs",
  icon = <InfoTwoTone />,
  iconColor = "secondary",
  content,
  actions = [],
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth={true}
      maxWidth={maxWidth}
      PaperProps={{ sx: { overflow: "visible", overflowY: "visible" } }}
    >
      <Box
        sx={{ textAlign: "center", mt: -10 }}
        children={
          <Box
            sx={{
              bgcolor: "white.main",
              borderRadius: "100%",
              width: 125,
              height: 125,
              overflow: "hidden",
              mx: "auto",
            }}
            children={cloneElement(icon, {
              className: "animate-pulsate-fwd",
              sx: {
                width: "100%",
                height: "100%",
              },
              color: iconColor,
            })}
          />
        }
      />

      <DialogTitle children={content} sx={{ textAlign: "center" }} />
      <DialogActions>
        <Grid container spacing={1}>
          {eList.toArray(
            actions,
            (
              index,
              { linkTo, onClick, close, variant, color, startIcon, text, flex }
            ) => {
              if (close) {
                linkTo = null;
                onClick = onClose;
              }
              return (
                <Grid key={`dal-${index}`} item xs={flex}>
                  <Button
                    {...(linkTo
                      ? { component: Link, to: linkTo }
                      : { onClick: onClick })}
                    variant={variant}
                    color={color}
                    startIcon={startIcon}
                    children={text}
                    fullWidth={true}
                    sx={{ px: 0.5 }}
                  />
                </Grid>
              );
            }
          )}
        </Grid>
      </DialogActions>
    </Dialog>
  );
};
export const MyDialogAction = ({
  linkTo,
  onClick,
  close = false,
  variant = "outlined",
  color = "secondary",
  startIcon,
  text,
  flex = 6,
}) => {
  return { linkTo, onClick, close, variant, color, startIcon, text, flex };
};

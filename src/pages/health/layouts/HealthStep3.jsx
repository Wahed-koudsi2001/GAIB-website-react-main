import { Button, Divider, Grid, Typography } from "@mui/material";
import { eList, eUseState, eUseTranslation } from "react-e-utils";
import {
  AppMuiInput,
  AppMuiInputDate,
  AppMuiInputEmail,
  AppMuiSelect,
} from "../../../layouts/AppForm";
import { FaUser, FaBirthdayCake } from "react-icons/fa";
import { IoMaleFemaleOutline } from "react-icons/io5";
import { IoPeopleCircleOutline } from "react-icons/io5";
import HealthForm from "./HealthForm";
import { MdEmail } from "react-icons/md";

const HealthStep3 = ({ activeStep, nextStep, prevStep, data, pushData }) => {
  const { t } = eUseTranslation();
  const persons = eUseState(0);
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

      <hr />

      <Grid
        item
        xs={12}
        children={
          persons.value > 0 && (
            <>
              <Typography variant="h4" gutterBottom>
                {t("include_person")}
              </Typography>
              <Button
                type="button"
                variant="outlined"
                color="primary"
                sx={{ px: 3, mx: 2 }}
                onClick={() => {
                  persons.value = persons.value + 1;
                }}
              >
                {t("add")}
              </Button>
              <Button
                type="button"
                variant="outlined"
                color="error"
                sx={{ px: 3, mx: 2 }}
                onClick={() => {
                  if (persons.value > 0) persons.value = persons.value - 1;
                }}
              >
                {t("remove")}
              </Button>
            </>
          )
        }
      />
      {persons.value === 0 && (
        <Grid item xs={12}>
          <Typography
            variant="body1"
            color="text.primary"
            textAlign={"center"}
            sx={{ width: "100%", py: 5 }}
          >
            {t("add_other_people_desc")}
            <br /> <br />
            <Button
              type="button"
              variant="outlined"
              color="primary"
              sx={{ px: 3 }}
              onClick={() => {
                persons.value = persons.value + 1;
              }}
            >
              {t("add")}
            </Button>
          </Typography>
        </Grid>
      )}
      {persons.value > 0 &&
        eList.generateArray(persons.value, (index) => {
          return <Person key={`hp-${index}`} index={index} data={data} />;
        })}
    </HealthForm>
  );
};
export default HealthStep3;

const Person = ({ data, index }) => {
  const { t } = eUseTranslation();
  return (
    <Grid item xs={12}>
      <Grid container>
        <AppMuiInput
          name="person_name[]"
          label={t("name")}
          placeholder={t("name_hint")}
          startIcon={<FaUser />}
          required={true}
          cols={{ xs: 12, sm: 6, md: 3 }}
        />
        <AppMuiSelect
          name="person_relation[]"
          label={t("relation")}
          required={true}
          startIcon={<IoPeopleCircleOutline />}
          options={[
            { value: "spouse", label: t("spouse") },
            { value: "child", label: t("children") },
          ]}
          cols={{ xs: 12, sm: 6, md: 3 }}
        />
        <AppMuiInputDate
          style={{ padding: "10px" }}
          name="person_birthdate[]"
          label={t("birthdate")}
          startIcon={<FaBirthdayCake />}
          required={true}
          cols={{ xs: 12, sm: 6, md: 3 }}
        />
        <AppMuiSelect
          name="person_gender[]"
          label={t("gender")}
          required={true}
          startIcon={<IoMaleFemaleOutline />}
          options={[
            { value: "male", label: t("male") },
            { value: "female", label: t("female") },
          ]}
          cols={{ xs: 12, sm: 6, md: 3 }}
        />
      </Grid>
      <Divider />
    </Grid>
  );
};

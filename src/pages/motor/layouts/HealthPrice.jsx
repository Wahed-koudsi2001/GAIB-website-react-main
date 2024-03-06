import {
  HealthAndSafetyTwoTone,
  PersonTwoTone,
  SafetyCheckTwoTone,
} from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { eList, eUseTranslation } from "react-e-utils";

const HealthPrice = ({ item, onChoosePolicy }) => {
  const { t, forLocale } = eUseTranslation();

  return (
    <Grid item xs={12} lg={6} sx={{ height: "auto" }}>
      <Card sx={{ height: "100%", boxShadow: 3 }}>
        <Stack direction={"column"} sx={{ height: "100%" }}>
          <CardContent
            sx={{
              borderColor: "primary.main",
              fontWeight: "bold",
            }}
          >
            <Typography variant="h4" color="primary" name="plan">
              {item?.[forLocale({ ar: "plan_name_alt" }, "plan_name")]}
            </Typography>
            <Typography
              variant="h5"
              sx={{ mt: 2, fontWeight: "bold" }}
              color="secondary.main"
              name="plan"
            >
              <Price price={item?.["total"]} currency={t("egp_year")} />
            </Typography>
          </CardContent>
          <Divider />
          <CardContent
            sx={{
              borderColor: "primary.main",
              fontWeight: "bold",
              py: 0,
            }}
          >
            <List sx={{ width: "100%", padding: 0 }}>
              {eList.toArray(item?.persons, (i, person) => {
                return (
                  <React.Fragment key={`persons-${i}`}>
                    <ListItem alignItems="flex-start" dense={true}>
                      <ListItemIcon>
                        <PersonTwoTone color="secondary" />
                      </ListItemIcon>
                      <ListItemText
                        primary={person?.name}
                        secondary={
                          <Price
                            price={person?.amount}
                            currency={t("egp_year")}
                          />
                        }
                        secondaryTypographyProps={{ color: "secondary.main" }}
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                );
              })}
            </List>
          </CardContent>
          <Divider />
          <CardContent
            sx={{
              borderColor: "primary.main",
              fontWeight: "bold",
              py: 0,
            }}
          >
            <Typography variant="body1" color="primaryT50.main" sx={{ py: 1 }}>
              {t("annual_limit")}
            </Typography>
            <List sx={{ width: "100%", padding: 0 }}>
              {eList.toArray(item?.healthLimit, (i, o) => {
                return (
                  <React.Fragment key={`limit-${i}`}>
                    <ListItem alignItems="flex-start" dense={true}>
                      <ListItemIcon sx={{ mt: 0 }}>
                        <SafetyCheckTwoTone color="secondary" />
                      </ListItemIcon>
                      <ListItemText
                        primary={o?.[forLocale({ ar: "name_alt" }, "name")]}
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                );
              })}
            </List>
          </CardContent>
          <Divider />
          <CardContent
            sx={{
              borderColor: "primary.main",
              fontWeight: "bold",
              py: 0,
            }}
          >
            <List sx={{ width: "100%", padding: 0 }}>
              <Typography
                variant="body1"
                color="primaryT50.main"
                sx={{ py: 1 }}
              >
                {t("health_benefits")}
              </Typography>
              {eList.toArray(item?.healthBenefits, (i, o) => {
                return (
                  <React.Fragment key={`benefits-${i}`}>
                    <ListItem alignItems="flex-start" dense={true}>
                      <ListItemIcon>
                        <HealthAndSafetyTwoTone color="secondary" />
                      </ListItemIcon>
                      <ListItemText
                        primary={o?.[forLocale({ ar: "name_alt" }, "name")]}
                        secondary={o?.[forLocale({ ar: "desc_alt" }, "desc")]}
                        secondaryTypographyProps={{ color: "dark600.main" }}
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                );
              })}
            </List>
          </CardContent>
          <div style={{ flexGrow: 1 }} />
          <Divider />
          <CardContent>
            <Stack direction="row" spacing={2}>
              <div style={{ flexGrow: 1 }} />
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                sx={{ px: 3 }}
                onClick={() => onChoosePolicy(item)}
              >
                {t("choose_policy")}
              </Button>
            </Stack>
          </CardContent>
        </Stack>
      </Card>
    </Grid>
  );
};
export default HealthPrice;

// {
//     "org_id": "7",
//     "org_name": "AXA",
//     "data_type": "system",
//     "plan_id": "24",
//     "plan_name": "Health Protect: Classic",
//     "total": 1095,
//     "matched_benefits_count": "2",
//     "matched_benefits_ids": "17,71",
//     "matched_benefits_names": "Inpatient,150,000 EGP",
//     "persons": [
//         {
//             "price_id": "69",
//             "name": "Mohamed Farouk",
//             "age": 4,
//             "amount": "1095"
//         }
//     ]
// }
// {
//     "name": "Mohamed Farouk",
//     "phone": "01284093913",
//     "email": "faroukcr06@gmail.com",
//     "birthdate": "2019-03-02",
//     "gender": "male",
//     "healthLimit": "71",
//     "healthBenefits": [
//         "17",
//         "16"
//     ]
// }

const Price = ({ price, currency }) => {
  return (
    <>
      {price} <span style={{ fontSize: "0.7em" }}>{currency}</span>
    </>
  );
};

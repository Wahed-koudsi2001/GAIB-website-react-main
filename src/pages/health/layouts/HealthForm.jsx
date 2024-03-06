import { Button, Grid, Stack, Typography } from "@mui/material";
import { eDom, eUseTranslation } from "react-e-utils";
const HealthForm = ({
  onSubmit,
  title,
  children,
  back = false,
  onBack = () => {},
  skip = false,
  onSkip = () => {},
  next = false,
  finish = false,
}) => {
  return (
    <form
      onSubmit={eDom.eventPreventDefault(({ target }) => {
        let fd = new FormData(target);
        onSubmit(fd);
      })}
      style={{ display: "contents" }}
    >
      <Stack
        direction={"column"}
        spacing={2}
        justifyContent={"start"}
        alignItems={"stretch"}
        sx={{ width: "100%", minHeight: "100%" }}
      >
        <HealthFormBody title={title} children={children} />

        <div style={{ flexGrow: 1 }} />
        <HealthFormBtns {...{ back, onBack, skip, onSkip, next, finish }} />
      </Stack>
    </form>
  );
};
export default HealthForm;

export const HealthFormBtns = ({
  back = false,
  onBack = () => {},
  skip = false,
  onSkip = () => {},
  next = false,
  finish = false,
}) => {
  const { t } = eUseTranslation();
  return (
    <Stack direction="row" spacing={2}>
      {back && (
        <Button
          type="button"
          variant="outlined"
          color="error"
          onClick={onBack}
          sx={{ px: 3 }}
        >
          {t("back")}
        </Button>
      )}
      {skip && (
        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={onSkip}
          sx={{ px: 3 }}
        >
          {t("skip")}
        </Button>
      )}
      <div style={{ flexGrow: 1 }} />
      {next && (
        <Button type="submit" variant="outlined" color="primary" sx={{ px: 3 }}>
          {t("next")}
        </Button>
      )}
      {finish && (
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ px: 3 }}
        >
          {t("finish")}
        </Button>
      )}
    </Stack>
  );
};

export const HealthFormBody = ({ title, children }) => {
  return (
    <>
      <Typography variant="h4" color="text.primary">
        {title}
      </Typography>

      <div style={{ width: "100%" }}>
        <Grid
          container
          spacing={2}
          justifyContent={"start"}
          alignItems={"stretch"}
        >
          {children}
        </Grid>
      </div>
    </>
  );
};

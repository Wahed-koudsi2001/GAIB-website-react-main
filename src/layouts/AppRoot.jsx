import { Scaffold } from "react-e-components";
import { Outlet } from "react-router-dom";
import bg1 from "../assets/images/bg1.jpeg";
import { eUseBreakpoints, eUseTranslation } from "react-e-utils";
import { AppBar, Button, Toolbar } from "@mui/material";
import {
  ArrowBackIosTwoTone,
  ArrowForwardIosTwoTone,
  LanguageTwoTone,
} from "@mui/icons-material";

const AppRoot = () => {
  const { forSize } = eUseBreakpoints();
  return (
    <Scaffold
      fixedPage={true}
      header={<Header />}
      body={<Outlet />}
      bodyProps={{
        sx: {
          padding: forSize(0.5, 1, 3, 5, 7),
          bgcolor: "background.whitet50",
          backdropFilter: "blur(2.5px)",
        },
      }}
      sx={{
        backgroundImage: `url('${bg1}')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  );
};
export default AppRoot;

const Header = () => {
  const { t, forDir, locale, locales, setLocale } = eUseTranslation();

  return (
    <AppBar position="static" color="white" elevation={0}>
      <Toolbar variant="dense">
        <Button
          href="../"
          startIcon={forDir(
            <ArrowBackIosTwoTone />,
            <ArrowForwardIosTwoTone />
          )}
        >
          {t("back")}
        </Button>
        <div style={{ flexGrow: 1 }} />
        <Button
          onClick={() => {
            setLocale(locale === "en" ? "ar" : "en");
          }}
          startIcon={<LanguageTwoTone />}
        >
          {locales[locale === "en" ? "ar" : "en"].name}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

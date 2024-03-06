import { MuiApp } from "react-e-components";
import { MultiProviders } from "react-e-utils";
import { RouterProvider, createHashRouter } from "react-router-dom";
import { materialTheme } from "./configs";
// import AppLocale from "./layouts/AppLocale";
import HealthPage from "./pages/health/HealthPage";
import AppRoot from "./layouts/AppRoot";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import MotorPage from "./pages/motor/MotorPage";
import HomePage from "./pages/home/HomePage";
import LifePage from "./pages/live/LifePage";

export default function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MultiProviders
        providers={[]}
        render={({ locale, dir }) => {
          return (
            <MuiApp locale={locale} dir={dir} theme={materialTheme()}>
              <RouterProvider
                router={createHashRouter([
                  {
                    path: "/",
                    element: <AppRoot />,
                    children: [
                      { path: "health", element: <HealthPage /> },
                      { path: "motor", element: <MotorPage /> },
                      { path: "home", element: <HomePage /> },
                      { path: "life", element: <LifePage /> },
                    ],
                  },
                ])}
              />
            </MuiApp>
          );
        }}
        includeBreakpoints={true}
        includeTranslation={true}
      />
    </LocalizationProvider>
  );
}

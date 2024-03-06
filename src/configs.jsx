import {
  eLocale,
  eInitTranslation,
  eInitBreakpoints,
  eUseTranslation,
  eUseBreakpoints,
  eApiCaller,
  eDate,
  eError,
  eSuccess,
} from "react-e-utils";
import { eCreateMuiTheme } from "react-e-components";
import en from "./assets/locales/en.json";
import ar from "./assets/locales/ar.json";
// eTranslation init
eInitTranslation(
  [
    new eLocale("ar", "rtl", "عربي", ['"Almarai"', "sans-serif"], ar),
    new eLocale("en", "ltr", "English", ['"Almarai"', "sans-serif"], en),
  ],
  {
    fillerTag: "<?>",
    autoDetect: true,
    defaultLocale: "ar",
  }
);
// eBreakpoints init
eInitBreakpoints();
// mui init
export const materialTheme = () => {
  const { fontfamily, dir } = eUseTranslation();
  const { sizeBreakpoints, deviceBreakpoints } = eUseBreakpoints();
  return eCreateMuiTheme({
    dir,
    mode: "light",
    fontSize: 10,
    fontResizeFactor: 5,
    fontFamily: fontfamily,
    primaryColor: "rgb(31, 48, 100)",
    secondaryColor: "rgb(3, 128, 60)",
    // tertiaryColor,
    // accentColor,
    textPrimaryColor: "#000",
    textSecondaryColor: "rgb(90,90,90)",
    bgDefaultColor: "#fff",
    sizeBreakpoints: sizeBreakpoints,
    deviceBreakpoints: deviceBreakpoints,
  });
};
// api
export const ApisEB = new eApiCaller("https://dev.exabytellc.com/APIs/GAIB/", {
  defaultHeaders: {
    "User-Timezone": eDate.now.timezoneOffset,
  },
  bodyDataType: "formdata",
  responseType: "json",
  responseHandler: (request) => {
    // request error
    if (request.httpCode !== 200) {
      return eError("server_error");
    }
    // api error
    let response = request.response;
    if (response.status !== 200) {
      // any error
      return eError(
        `${response.status}:${response.statusText}:${response.error}`,
        response.data
      );
    }
    // success
    return eSuccess(response.message, response.data);
  },
});
export function ApisEBMedia(url) {
  if (url) return this.baseUrl + "_media/" + url;
  return null;
}

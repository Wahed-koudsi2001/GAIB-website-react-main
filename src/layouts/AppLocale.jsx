import { useLayoutEffect } from "react";
import { eUseTranslation } from "react-e-utils";
import { Outlet, useParams } from "react-router-dom";

const AppLocale = () => {
  const { locale } = useParams();
  const { setLocale } = eUseTranslation();
  useLayoutEffect(() => {
    setLocale(locale);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <Outlet />;
};
export default AppLocale;

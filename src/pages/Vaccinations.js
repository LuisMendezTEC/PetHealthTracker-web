import React from "react";
import { useTranslation } from "react-i18next";
import AddVaccinationForm from "../components/AddVaccinationForm";

const Vaccinations = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        {t("vaccination_page.title")}
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        {t("vaccination_page.subtitle")}
      </p>
      <AddVaccinationForm />
    </div>
  );
};

export default Vaccinations;
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const AddVaccinationForm = () => {
  const { t } = useTranslation();
  const [mascotas, setMascotas] = useState([]);
  const [vacunas, setVacunas] = useState([]);
  const [selectedMascota, setSelectedMascota] = useState("");
  const [selectedVacuna, setSelectedVacuna] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMascotas = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/mascotas`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setMascotas(data.data || []);
      } catch (err) {
        setError(t("error_loading_mascotas"));
      }
    };

    const fetchVacunas = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/vacunas`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setVacunas(data.data || []);
      } catch (err) {
        setError(t("error_loading_vacunas"));
      }
    };

    fetchMascotas();
    fetchVacunas();
  }, [t]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMascota || !selectedVacuna) {
      setError(t("select_both_fields"));
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/vacunas/asociar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ mascota_id: selectedMascota, vacuna_id: selectedVacuna }),
      });

      if (!res.ok) throw new Error(t("error_associating_vaccine"));

      const data = await res.json();
      setMessage(data.message);
      setError("");
    } catch (err) {
      setError(t("error_associating_vaccine"));
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        {t("vaccination_form.title")}
      </h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {message && <p className="text-green-500 mb-4">{message}</p>}
  
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            {t("vaccination_form.select_pet")}
          </label>
          <select
            className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            value={selectedMascota}
            onChange={(e) => setSelectedMascota(e.target.value)}
          >
            <option value="">{t("vaccination_form.select_pet_placeholder")}</option>
            {mascotas.map((mascota) => (
              <option key={mascota.id} value={mascota.id}>
                {mascota.nombre_mascota}
              </option>
            ))}
          </select>
        </div>
  
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            {t("vaccination_form.select_vaccine")}
          </label>
          <select
            className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            value={selectedVacuna}
            onChange={(e) => setSelectedVacuna(e.target.value)}
          >
            <option value="">{t("vaccination_form.select_vaccine_placeholder")}</option>
            {vacunas.map((vacuna) => (
              <option key={vacuna.id} value={vacuna.id}>
                {vacuna.tipo_vacuna}
              </option>
            ))}
          </select>
        </div>
  
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          {t("vaccination_form.submit")}
        </button>
      </form>
    </div>
  );
};

export default AddVaccinationForm;
import api from "../services/api";

import useGenomeStore from "../store/useGenomeStore";

export default function useFastaUpload() {
  const setLoading = useGenomeStore((state) => state.setLoading);
  const setError = useGenomeStore((state) => state.setError);
  const setData = useGenomeStore((state) => state.setData);

  const uploadFasta = async (files) => {
    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();

      files.forEach((file) => {
        formData.append("files", file);
      });

      const response = await api.post("/align", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setData(response.data);

      return response.data;
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.detail ||
          "Erreur lors du traitement FASTA."
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    uploadFasta,
  };
}
import api from "../services/api";
import useGenbankStore from "../store/useGenbankStore";

export default function useGenbankUpload() {
  const setLoading = useGenbankStore((state) => state.setLoading);
  const setError = useGenbankStore((state) => state.setError);
  const setGenbankData = useGenbankStore((state) => state.setGenbankData);

  const uploadGenbankFiles = async (
    files,
    options = {
      mode: "compact",
      feature_type: "ALL",
      category: "ALL",
    }
  ) => {
    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();

      files.forEach((file) => {
        formData.append("files", file);
      });

      const response = await api.post("/genbank/visualize", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: {
          mode: options.mode,
          feature_type: options.feature_type,
          category: options.category,
        },
      });

      setGenbankData(response.data.data);

      return response.data.data;
    } catch (error) {
      setError(
        error.response?.data?.detail ||
          "Erreur lors de la visualisation GenBank."
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    uploadGenbankFiles,
  };
}
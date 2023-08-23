import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";

export const api = axios.create({
  baseURL: "http://localhost:8000",
});

export const getAllProperties = async () => {
  try {
    const res = await api.get("/api/residencies", {
      timeout: 10 * 1000,
    });

    if (res.status === 400 || res.status === 500) {
      throw res.data;
    }
    return res.data;
  } catch (err) {
    toast.error("Something went wrong");
    throw err;
  }
};

export const getProperty = async (id: string) => {
  try {
    const res = await api.get(`/api/residencies/${id}`, {
      timeout: 10 * 1000,
    });

    if (res.status === 400 || res.status === 500) {
      throw res.data;
    }
    return res.data;
  } catch (err) {
    toast.error("Something went wrong");
    throw err;
  }
};

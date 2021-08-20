import { useEffect, useReducer } from "react";
import { request } from "strapi-helper-plugin";
import reducer, { initialState } from "./reducer";

const useDashboard = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchDashboardData = async () => {
    dispatch({ type: "LOADING" });

    try {
      const files = await request("/upload/files?_limit=5000", { method: "GET" });

      dispatch({
        type: "GET_DATA_SUCCEEDED",
        files,
      });
    } catch (err) {
      dispatch({
        type: "GET_DATA_ERROR",
      });
      // eslint-disable-next-line no-undef
      strapi.notification.toggle({
        type: "warning",
        message: { id: "notification.error" },
      });
    }
  };

  useEffect(() => fetchDashboardData(), []);

  return { ...state, getData: fetchDashboardData };
};

export default useDashboard;

import { v4 as uuidv4 } from "uuid";
import { REMOVEALERT, SETALERT } from "../types/alertTypes";

export const setAlert = (msg, alertType) => (dispatch) => {
  const id = uuidv4();
  dispatch({
    type: SETALERT,
    payload: {
      id,
      msg,
      alertType,
    },
  });
  setTimeout(() => {
    dispatch({
      type: REMOVEALERT,
      payload: id,
    });
  }, 3000);
};

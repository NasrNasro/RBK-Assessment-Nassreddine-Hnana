import axios from "axios";
import { setAlert } from "./alertActions";

export const addPage = (info, selectedImages) => async (dispatch) => {
  const data = new FormData();
  data.append("images", selectedImages);
  data.append("title", info.title);
  data.append("content", info.content);
  console.log(data);
  try {
    await axios.post("http://localhost:5000/api/pages/add-page-images", data);
  } catch (error) {
    error.response.data.errors.forEach((err) =>
      dispatch(setAlert(err.msg, "danger"))
    );
    console.log({ msg: "could not add product", error });
  }
};

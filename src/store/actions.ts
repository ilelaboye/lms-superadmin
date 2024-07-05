import axios from "axios";
import { useToast } from "vue-toast-notification";

export const handleError = (context: any, error: any) => {
  if (error.request.status == 422) {
    var resp = JSON.parse(error.request.response);

    var err = resp.errors;
    console.log(err);

    var msg = "";
    for (var item in err) {
      msg = err[item][0];
      break;
    }
    console.log(msg);
    useToast().error(msg);
  } else if (error.request.status == 404) {
    resp = JSON.parse(error.request.response);
    msg = "Request not found";
    useToast().error(msg);
  } else if (error.request.status == 400) {
    useToast().error(error.response.data.message);
  } else if (error.request.status == 401) {
    resp = JSON.parse(error.request.response);
    useToast().error(resp.message);
    context.commit("logout");
  } else {
    useToast().error("Something went wrong, please try again");
  }
};

export const post = (context: any, data: any) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${context.state.base_url}${data.endpoint}`, data.details, {
        headers: {
          Authorization: "Bearer " + context.state.token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        context.dispatch("handleError", err);
        reject(err);
      });
  });
};

export const get = (context: any, endpoint: string) => {
  // console.log(context.state.token);
  return new Promise((resolve, reject) => {
    axios
      .get(`${context.state.base_url}${endpoint}`, {
        headers: {
          Authorization: "Bearer " + context.state.token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        context.dispatch("handleError", err);
        reject(err);
      });
  });
};

export const patch = (context: any, data: any) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(`${context.state.base_url}${data.endpoint}`, data.details, {
        headers: {
          Authorization: "Bearer " + context.state.token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        context.dispatch("handleError", err);
        reject(err);
      });
  });
};

import { useToast } from "vue-toast-notification";

export const setUser = (state: any, user: any) => {
  state.user = user.user;
  state.token = user.token;
  var result = encodeURIComponent(JSON.stringify(user));
  localStorage.setItem("lms_super", result);
};
export const getUser = (state: any) => {
  var data = localStorage.getItem("lms_super");
  if (data) {
    var js = JSON.parse(decodeURIComponent(data));
    state.user = js.profile;
    state.token = js.token;
    // console.log(state);
  } else {
    useToast().error("Token expired, please login again");
  }
  // console.log("state", state);
};
export const logout = (state: any) => {
  window.localStorage.removeItem("lms_super");
  state.user = null;
  state.token = null;
  // window.location.href = "/";
};

export const setLoader = (state: any, data: boolean) => {
  state.loader = data;
};

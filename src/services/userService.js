import axios from "axios";

// const baseUrl = process.env.REACT_APP_API_URL;

export const getCurrentActiveUser = () =>
  axios.get(
    `${JSON.parse(localStorage.getItem("domainUrl"))}user/getCurrentActiveUser`
  );

export const onLogin = (params) =>
  axios.get(
    `${JSON.parse(localStorage.getItem("domainUrl"))}api/user/` +
      params.username,
    params
  );

export const logOutUser = () =>
  axios.get(`${JSON.parse(localStorage.getItem("domainUrl"))}logout`);

export const getContextUrls = () =>
  axios.get(
    `${JSON.parse(
      localStorage.getItem("domainUrl")
    )}crawler/getContextURLsForExtension`
  );

// export const onLogin = (params) => {
// 	let options = {
// 		method: 'POST',
// 		headers: { 'content-type': 'application/x-www-form-urlencoded', 'x-requested-with': 'XMLHttpRequest' },
// 		url: `${baseUrl}j_spring_security_check`,
// 		data: {
// 			'username': 'admin',
// 			'password': 'admin'
// 		}
// 	}
// 	return axios(options)
// }

export default {
  onLogin,
  getCurrentActiveUser,
  logOutUser,
  getContextUrls,
};

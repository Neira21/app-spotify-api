import axios from "axios";


const authEndpoint = import.meta.env.VITE_AUTH_ENDPOINT;
const clientId = import.meta.env.VITE_CLIENT_ID;
const redirectUri = import.meta.env.VITE_REDIRECT_URI;

const scopes = ["user-library-read", "user-library-modify", "playlist-read-private", "playlist-modify-private", "playlist-modify-public"]

const response_type = "token";

export const loginEndpoint = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=${response_type}&show_dialog=true`


const apiClient = axios.create({
  baseURL: "https://api.spotify.com/v1",
})

export const setClientToken = (token) => {
  apiClient.interceptors.request.use( async function (config) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  })
}

export default apiClient;

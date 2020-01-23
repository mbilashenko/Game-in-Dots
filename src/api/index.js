import axios from "axios";

import { api, API_RESPONSE } from "../config";

// Create new axios instance with base url
const axiosInstance = axios.create({
  baseURL: API_RESPONSE
});

export default {
  /**
   * Get all game settings / GET METHOD
   * @returns {Promise<AxiosResponse<T>>}
   */
  getGameSettings: () => axiosInstance.get(api.settings),

  /**
   * Send winner to API / POST METHOD
   * @param {string} winner
   * @returns {Promise<AxiosResponse<T>>}
   */
  sendWinner: winner => axiosInstance.post(api.winners, winner),

  /**
   * Get list of all leaders / GET METHOD
   * @returns {Promise<AxiosResponse<T>>}
   */
  getLeaders: () => axiosInstance.get(api.winners)
};

export const API_RESPONSE = "//starnavi-frontend-test-task.herokuapp.com";

export const api = {
  settings: "/game-settings",
  winners: "/winners"
};

export const game = {
  // Default settings
  settings: {
    delay: 2000,
    field: 5
  },
  // Limits
  limit: {
    maxFields: 24,
    minFields: 2
  }
};

export default { api, game };

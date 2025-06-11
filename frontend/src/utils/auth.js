// Utility function to get auth token from localStorage
// Checks both 'userToken' (used by authSlice) and 'token' (legacy) for compatibility
export const getAuthToken = () => {
  return localStorage.getItem("userToken") || localStorage.getItem("token");
};

// Utility function to remove auth tokens
export const removeAuthTokens = () => {
  localStorage.removeItem("userToken");
  localStorage.removeItem("token");
};

// Utility function to set auth token
export const setAuthToken = (token) => {
  localStorage.setItem("userToken", token);
};

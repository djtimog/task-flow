export const getAuthHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

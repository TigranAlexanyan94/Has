export const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `jwt ${localStorage.getItem("token")}`,
};

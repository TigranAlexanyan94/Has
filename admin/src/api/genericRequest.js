export const genericRequest = (method, headers, body) => {
  const response = {
    method: method,
    headers: headers,
    body: body,
  };
  if(!response.body){
    delete response.body;
  }
  return response;
};

export const login = (body) => {
  return fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    method: "POST",
  })
    .then((data) => data.json()).then((tokens) => {
        if(tokens.statusCode == 500){
            return tokens.message;
        }
        localStorage.setItem('token', tokens.access_token)
        return true;
    })
    .catch((err) => err.message);}
export const register = (body) =>
  fetch(`${process.env.REACT_APP_API_URL}/users`, {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    method: "POST",
  })
    .then((data) => data.json())
    .catch((err) => console.log(err));

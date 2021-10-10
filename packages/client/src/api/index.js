import axios from 'axios';

const axipsOptions = {
  baseURL: 'http://127.0.0.1:5000/api'
};

const apiInstance = axios.create(axipsOptions);

export const getUsers = () => apiInstance.get('/users');
// export const getUsers = () => {
//   return Promise.resolve({ data: users });
// };

//для варианта с сервером мы использоуем апи инстанс
export const createUser = user => {
  const userResult = apiInstance.post('/users', user);
  console.log(`userResult`, userResult);
  return userResult;
};

// export const createUser = user => {
//   const newUser = {
//     id: Date.now(),
//     ...user,
//   };
//   users.push(newUser);
//   return Promise.resolve({ data: newUser });
// };

//для сервера
export const deleteUser = id => apiInstance.delete(`/users/${id}`);
// export const deleteUser = id => {
//   const index = users.findIndex(u => u.id === id);

//   return Promise.resolve({ data: users.splice(index, 1) });
// };

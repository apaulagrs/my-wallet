// Coloque aqui suas actions
export const USER = 'USER';

export const userRequest = (email) => ({
  type: USER,
  email,
});

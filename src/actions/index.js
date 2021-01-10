// Coloque aqui suas actions
export default function addUser(email, password) {
  return {
    type: "USER",
    data: {
      email,
      password,
    },
  };
}

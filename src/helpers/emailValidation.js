const emailOk = (email, senha) => {
  const pattern = '^+@[a-zA-Z_]+?.[a-zA-Z]{2,3}$';
  const number = 6;
  if (pattern.match(email) && senha.length >= number) return false;
};

export default emailOk;

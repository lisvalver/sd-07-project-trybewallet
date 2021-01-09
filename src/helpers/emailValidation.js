const emailOk = (email, senha) => {
  const number = 6;
  if (email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
  && senha.length >= number) { return false; }
  return true;
};
export default emailOk;

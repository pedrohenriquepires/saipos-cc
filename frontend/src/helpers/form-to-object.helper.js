export const formToObject = form =>
  Object.fromEntries(new FormData(form).entries())

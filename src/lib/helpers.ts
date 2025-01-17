// dd/src/lib/helpers.ts
export const generateUsername = (email: string) => {
  const username = email.split('@')[0] + Math.floor(Math.random() * 1000);
  return username;
};
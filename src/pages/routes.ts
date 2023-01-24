export const BASE_NAME =
  process.env.NODE_ENV === "production" ? process.env.PUBLIC_URL : "holy";

export const urlRouter = (subroute: string) => `${BASE_NAME}/${subroute}`;

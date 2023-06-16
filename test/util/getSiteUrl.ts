const PROTOCOL = "http://";
const DOMAIN = "127.0.0.1";
const PORT = process.env.PORT ?? "8081";

export const getSiteUrl = (
  fragment: string,
  port: string | number = PORT
): string => {
  return (
    PROTOCOL +
    DOMAIN +
    ":" +
    port.toString() +
    "/" +
    fragment.replace(/^\/+/, "")
  );
};

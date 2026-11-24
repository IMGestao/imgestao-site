export const SITE_NAME = "IM Estratégia e Gestão";
export const SITE_URL = "https://imgestao.com.br";
export function resolveCanonical(pathname = "/") {
  return new URL(pathname, SITE_URL + "/").toString();
}

export function getInitials(name: string) {
  const names = name?.trim().split(" ") || "";
  const firstName = names[0] != null ? names[0] : "";
  const lastName = names.length > 1 ? names[names.length - 1] : "";
  return firstName && lastName
    ? `${firstName.charAt(0)}${lastName.charAt(0)}`
    : firstName.charAt(0);
}

const toSnakeCase = (str: string): string =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

export const mapQueryString = (params: any) => {
  const queryArray: string[] = [];

  Object.entries(params)
    .filter(([, value]) => value !== undefined)
    .forEach(([key, value]: any) => {
      queryArray.push(`${toSnakeCase(key)}=${encodeURIComponent(value)}`);
    });

  return queryArray.join("&");
};

export function getPageTitle({
  pathname,
  title,
  domain,
}: {
  pathname: string;
  title: string;
  domain: string;
}): string {
  const pathParts = pathname.split("/");

  let tileParts: string[] = extractTitleParts({ title, pathParts, domain });

  return tileParts.join(" • ");
}

function extractTitleParts({
  title,
  pathParts,
  domain,
}: {
  title: string;
  pathParts: string[];
  domain: string;
}): string[] {
  if (pathParts.length > 3) {
    return [title, capitalize(pathParts.slice(1, -1)[0]), domain];
  }

  return [title, domain];
}

function capitalize(str: string) {
  const firstLetter = str.charAt(0).toUpperCase();
  const rest = str.slice(1);
  return `${firstLetter}${rest}`;
}

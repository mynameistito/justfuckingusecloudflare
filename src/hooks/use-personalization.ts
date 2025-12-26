import { useSearchParams } from "react-router-dom";

/**
 * Normalizes a name by capitalizing the first letter and trimming whitespace
 */
function normalizeName(name: string | null): string | null {
  if (!name || name.trim().length === 0) {
    return null;
  }
  const trimmed = name.trim();
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
}

/**
 * Custom hook to read and normalize personalization parameters from URL
 * @returns Object containing normalized 'to' and 'from' names, and isPersonalized flag
 */
export function usePersonalization() {
  const [searchParams] = useSearchParams();
  const to = normalizeName(searchParams.get("to"));
  const from = normalizeName(searchParams.get("from"));
  const isPersonalized = to !== null || from !== null;

  return {
    to,
    from,
    isPersonalized,
  };
}

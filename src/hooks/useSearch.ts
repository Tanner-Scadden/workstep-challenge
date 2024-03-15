// This would normally come from your router lib.
export const useSearch = () => {
  const url = new URL(window.location.href);

  const setSearch = (search: Record<string, string | undefined | null>) => {
    for (const key in search) {
      const value = search[key];
      if (value === null || value === undefined) {
        url.searchParams.delete(key);
      } else {
        url.searchParams.set(key, value);
      }
    }

    window.history.pushState({}, "", url.toString());
  };

  return [url.searchParams, setSearch] as const;
};

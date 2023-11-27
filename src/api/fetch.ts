interface IFetchDataProps {
  url: string;
}

export const fetchData = async ({
  url,
}: IFetchDataProps): Promise<{ joke: string }[]> => {
  try {
    const API_KEY = import.meta.env.VITE_API_NINJA_KEY;
    if (!API_KEY) {
      throw new Error("API key is not defined");
    }

    const response = await fetch(url, {
      method: "GET",
      headers: new Headers({
        "X-Api-Key": API_KEY,
        "Content-Type": "application/json",
      }),
    });

    if (!response.ok) {
      throw new Error(`Fetch failed with status ${response.status}`);
    }

    const data: { joke: string }[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return Promise.reject("Failed to fetch data");
  }
};

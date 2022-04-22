import axios from "axios";

export const getQuoteApi = async (setQuotes) => {
  try {
    const { data } = await axios.get(
      "https://api.quotable.io/random?maxLength=50"
    );

    setQuotes(data);
  } catch (error) {
    console.error(error);
  }
};

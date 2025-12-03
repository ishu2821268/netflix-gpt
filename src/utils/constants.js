export const LOGO =
  "https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-08-26/consent/87b6a5c0-0104-4e96-a291-092c11350111/0198e689-25fa-7d64-bb49-0f7e75f898d2/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";

export const BANNER_IMAGE =
  "https://assets.nflxext.com/ffe/siteui/vlv3/6fd9d446-cd78-453a-8c9c-417ed3e00422/web/IN-en-20251117-TRIFECTA-perspective_2fe4e381-977f-49fd-a7f4-1da0bcf09429_medium.jpg";

export const USER_AVATAR =
  "https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg";

export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOWYzMjY0YTBiYjlmYzYzYzdmZjFmZWE5YjAzMmNjYSIsIm5iZiI6MTc2MTExMTI4MC4zMywic3ViIjoiNjhmODZjZjBhYTZjNDI4MDQ3ODA1NTg4Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.ICu3B4tv-RA97gVNNSYiMdqIwpIZgnSPwAxXDv9tLG0",
  },
};

export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500/";

export const SUPPORTED_LANGUAGES = [
  { identifier: "eng", name: "English" },
  { identifier: "hindi", name: "Hindi" },
  { identifier: "spanish", name: "Spanish" },
  { identifier: "chinese", name: "Chinese" },
];

export const OPENAI_KEY = "AIzaSyBqDQSaFYk1rrjN4nbw_JAluqA8bDf6fbc";

// npm install openai
//   import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: "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",
// });

// const response = openai.responses.create({
//   model: "gpt-5-nano",
//   input: "write a haiku about ai",
//   store: true,
// });

// response.then((result) => console.log(result.output_text));

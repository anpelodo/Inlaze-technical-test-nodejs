export const config = {
  server: {
    port: process.env.PORT || 3000,
    timeZone: process.env.TIME_ZONE || "America/Bogota",
  },
  movieProvider: {
    apiKey: process.env.MOVIE_APIKEY || "1eb44f01d94d0b6545d1b902a25b91c7",
  },
};

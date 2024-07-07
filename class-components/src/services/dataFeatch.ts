export const dataFetching = () => {
  const url = `https://stapi.co/api/v1/rest/episode/search/?offset=0&limit=20`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    })
}

dataFetching();

let country = 'ng';
const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=technology&apiKey=2b33e643ea7746df83189c4c34db445f`;

export async function getNews() {
  let result = await fetch(url).then(response => response.json());
  return result.articles;
}

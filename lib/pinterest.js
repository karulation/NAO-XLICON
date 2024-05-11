import cheerio from 'cheerio';
import fetch from 'node-fetch';
import { lookup } from 'mime-types';

async function pinterest(query) {
  let res = await fetch(`https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${query}%20safe%20for%20work&data=%7B%22options%22%3A%7B%22isPrefetch%22%3Afalse%2C%22query%22%3A%22${query}%22%2C%22scope%22%3A%22pins%22%2C%22no_fetch_context_on_resource%22%3Afalse%7D%2C%22context%22%3A%7B%7D%7D&_=1619980301559`);
  let json = await res.json();
  let data = json.resource_response.data.results;
  if (!data || data.length === 0) {
    throw 'No images found for the given query';
  }
  let index = Math.floor(Math.random() * data.length);
  return data[index].images.orig.url;
}

export { pinterest, shortUrl };

import axios from 'axios';
import cheerio from 'cheerio';

async function tiktok2(url) {
  return new Promise((resolve, reject) => {
    axios.get('https://ttdownloader.com/', {
      headers: {
        'User-Agent': UserAgent(), // Use the UserAgent function to generate a random User-Agent header
        'Cookie': 'ttwid=1%7C5UyITGuqEDXVZHtmtbU-7V35lTk8--iB6IjJuxRKPTs%7C1625390616%7C62c0b171e938115d5940a9af40c377000bc616cc7b25dfd76557913951585606; Domain=.tiktok.com; Path=/; Expires=Mon, 04 Jul 2022 09:23:36 GMT; HttpOnlytt_webid_v2=6980999485653632513; path=/; expires=Mon, 04 Jul 2022 09:23:37 GMT; domain=.tiktok.com; samesite=none; secure; httponlytt_webid=6980999485653632513; path=/; expires=Mon, 04 Jul 2022 09:23:37 GMT; domain=.tiktok.com; samesite=none; secure; httponlytt_csrf_token=9u_ml89_dULuOD6oMp_zTH06; path=/; domain=.tiktok.com; samesite=lax; secure; httponly',
      }
    }).then(res => {
      const $ = cheerio.load(res.data);
      const token = $('#token').attr('value');

      axios.post('https://ttdownloader.com/req/', new URLSearchParams({
        url: url,
        format: '',
        token: token,
      }), {
        headers: {
          'Accept': '*/*',
          'Accept-Language': 'en-US,en;q=0.9,id;q=0.8',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'User-Agent': UserAgent(), // Use the UserAgent function to generate a random User-Agent header
          'Cookie': '_ga=GA1.2.1240046717.1620835673; PHPSESSID=i14curq5t8omcljj1hlle52762; popCookie=1; _gid=GA1.2.1936694796.1623913934',
        }
      }).then(res => {
        const ch = cheerio.load(res.data);
        const result = {
          status: res.status,
          result: {
            nowatermark: ch('#results-list > div:nth-child(2)').find('div.download > a').attr('href'),
            watermark: ch('#results-list > div:nth-child(3)').find('div.download > a').attr('href'),
            audio: ch('#results-list > div:nth-child(4)').find('div.download > a').attr('href'),
          }
        };
        resolve(result);
      }).catch(reject);
    }).catch(reject);
  });
}

function UserAgent() {
  const ossss = [
    'Macintosh; Intel Mac OS X 10_15_7',
    'Macintosh; Intel Mac OS X 10_15_5',
    'Macintosh; Intel Mac OS X 10_11_6',
    'Macintosh; Intel Mac OS X 10_11_5',
    'Windows NT 10.0; Win64; x64',
    'Windows NT 10.0',
  ];
  return `Mozilla/5.0 (${ossss[Math.floor(Math.random() * ossss.length)]}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${Math.floor(Math.random() * 3) + 87}.0.${Math.floor(Math.random() * 190) + 4100}.${Math.floor(Math.random() * 50) + 140} Safari/537.36`;
}

export default tiktok2;

/**
 * @see https://developers.google.com/youtube/v3/docs/search/list
 */

const searchByKeyword = (keyword) => {
  try {
    const results = YouTube.Search.list('id,snippet', {
      q: keyword,
      maxResults: 1
    });
    if (results === null) {
      console.log('Unable to search videos');
      return {
        message: "Unable to search videos",
      }
    }
    const item = results.items[0];
    console.log('Title: %s', item.snippet.title);
    console.log("Url: %s", "https://www.youtube.com/watch?v=" + item.id.videoId);
    console.log("Img: %s", item.snippet.thumbnails.high.url);
    return {
      message: item.snippet.title,
      url: "https://www.youtube.com/watch?v=" + item.id.videoId,
      img: item.snippet.thumbnails.high.url,
    }

  } catch (err) {
    console.log('Failed with an error %s', err.message);
    return {
      message: "Failed with an error " + err.message,
    }
  }
}


const doGet = (e) => {
  const response = searchByKeyword(e.parameter.keyword);
  return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
}

















exports.filterPostData = (jsonObject) => {
  const data = jsonObject.payload;
  const newObject = {
    response: [],
  };
  for(let i = 0; i < data.length; i++) {
    if(data[i].drm === true && data[i].episodeCount > 0) {
      let showItem = {};
      showItem.image = data[i].image.showImage;
      showItem.slug = data[i].slug;
      showItem.title = data[i].title;
      newObject.response.push(showItem);
    }
  }
  return JSON.stringify(newObject);
}
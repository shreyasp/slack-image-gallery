import axios from 'axios';
import { reverse, sortBy } from 'lodash';

function fetchImages(imageCategory: string, page: number = 1) {
  const axiosConfig = {
    headers: {
      Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`
    },
    params: {
      order_by: imageCategory,
      per_page: 12,
      page: page
    }
  };

  return axios
    .get(`https://api.unsplash.com/photos`, axiosConfig)
    .then(response => response.data)
    .then(data => reverse(sortBy(data, "likes")))
    .then(images => images)
    .catch(err => {
      throw err;
    });
}

export { fetchImages };

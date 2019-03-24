import axios from "axios";

import { UnsplashImage } from "../models/UnsplashImage";

function fetchImages(
  imageCategory: string | undefined,
  page: number = 1
): Promise<UnsplashImage[]> {
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

  if (!!imageCategory) {
    return axios
      .get(`https://api.unsplash.com/photos`, axiosConfig)
      .then(response => response.data)
      .then(images => images)
      .catch(err => {
        throw err;
      });
  } else {
    return Promise.reject({
      msg: "No Category provided"
    });
  }
}

export { fetchImages };

export interface UnsplashImage {
  id: string;
  created_at: string;
  updated_at: string;
  width: number;
  height: number;
  color: string;
  description: string;
  alt_description: string;
  urls: UnsplashImageUrls;
  sponsored: boolean;
  sponsored_by: string;
  sponsored_impressions_id: string;
  likes: number;
  liked_by_user: boolean;
  user: UnsplashUser;
}

export interface UnsplashImageUrls {
  raw: string;
  regular: string;
  small: string;
  thumb: string;
  full: string;
}

export interface UnsplashUser {
  first_name: string;
  name: string;
  last_name: string;
  username: string;
}

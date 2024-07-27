import DataNews from './data/news.json';
import { getImgUrlArray, timeout } from "../utils/common";

export type ICategory = {
  key: string;
  name: string;
};

export type INew = {
  uniquekey: string;
  title: string;
  date: string;
  catetory: string;
  author_name: string;
  url: string;
  thumbnail_pic_s: string;
  thumbnail_pic_s02?: string;
  thumbnail_pic_s03?: string;
  is_content: string;
};

function isEmptyImg(imgUrl: string | undefined | null) {
  if (imgUrl === undefined || imgUrl === null) {
    return true;
  }

  return imgUrl.length === 0;
}

export async function getNewsCategoryList(): Promise<Array<ICategory>> {
  await timeout(0.5);
  const data: Array<ICategory> = DataNews.category;
  return data;
}

export async function getNewsListByCategory(category: string) {
  await timeout(0.5);
  const data: Array<INew> = (DataNews as any)[category] ?? [];
  data.forEach(item => {
    const imgList = getImgUrlArray(3);
    if (isEmptyImg(item.thumbnail_pic_s)) {
      item.thumbnail_pic_s = imgList[0];
    }

    if (isEmptyImg(item.thumbnail_pic_s02)) {
      item.thumbnail_pic_s02 = imgList[1];
    }

    if (isEmptyImg(item.thumbnail_pic_s03)) {
      item.thumbnail_pic_s03 = imgList[2];
    }
  })

  return data;
}

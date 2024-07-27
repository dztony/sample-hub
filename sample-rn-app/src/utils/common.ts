import { random } from 'lodash';
import { storage } from './storage';

export enum EnumInputType {
  common = 'common',
  password = 'password',
}

export type IUser = {
  username: string;
  password: string;
}

export async function timeout(cost: number = 1.5) {
  return new Promise<any>((resolve, reject) => {
    setTimeout(() => {
      resolve(null);
    }, 1000 * cost)
  })
}

class UserUtil {
  private readonly cacheKey = 'userList';
  private readonly curUserKey = 'curUser';
  private readonly sessionTokenKey = 'session-token';

  constructor() {
    this.init();
  }

  private getUserList(): Array<IUser> {
    const cacheStr = storage.getString(this.cacheKey) as string;
    return JSON.parse(cacheStr);
  }

  private init(): void {
    const initUserList: Array<IUser> = [
      {
        username: 'xiaohei',
        password: '666',
      },
    ];
    // storage.set(this.cacheKey, JSON.stringify(initUserList));
    this.saveUser(initUserList);
  }

  private saveUser(curUserList: Array<IUser>): void {
    storage.set(this.cacheKey, JSON.stringify(curUserList));
  }

  login(user: IUser): boolean {
    const curUserList = this.getUserList();
    for (const item of curUserList) {
      if (item.username === user.username && item.password === user.password) {
        storage.set(this.curUserKey, JSON.stringify(user));
        const sessionToken = randomIdGenerator();
        storage.set(this.sessionTokenKey, sessionToken);
        return true;
      }
    }

    return false;
  }

  clearLoginCache(): void {
    storage.delete(this.curUserKey);
    storage.delete(this.sessionTokenKey);
  }

  addUser(user: IUser): void {
    const curUserList = this.getUserList();
    const data = [
      ...curUserList,
      user,
    ]
    this.saveUser(data);
  }

  updatePassword(user: IUser): void {
    const curUserList = this.getUserList();
    const targetUser = curUserList.filter(item => item.username === user.username);
    const targetIndex = curUserList.findIndex(item => item.username === user.username);
    if (targetIndex !== -1) {
      const data = [
        ...curUserList.splice(targetIndex, 1),
        user,
      ];
      this.saveUser(data);
    } else {
      throw new Error(`未找到用户 - ${user.username}`);
    }
  }

  getUserToken(): string {
    const cacheStr = storage.getString(this.sessionTokenKey) ?? '';
    return cacheStr;
  }
}

export function randomIdGenerator(): string {
  return new Date().getTime().toString();
}

export const User = new UserUtil();

export type IWeather = {
  date: string;
  tag1: string;
  tag2: string;
  icon1: string;
  icon2: string;
};

const ImageUrlList = [
  'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
  'https://cdn.pixabay.com/photo/2023/11/27/21/15/bird-8416208_1280.jpg',
  'https://cdn.pixabay.com/photo/2020/04/07/02/02/station-5011733_1280.png',
  'https://t7.baidu.com/it/u=4036010509,3445021118&fm=193&f=GIF',
  'https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF',
  'https://t7.baidu.com/it/u=1956604245,3662848045&fm=193&f=GIF',
  'https://t7.baidu.com/it/u=727460147,2222092211&fm=193&f=GIF',
  'https://t7.baidu.com/it/u=2511982910,2454873241&fm=193&f=GIF',
  'https://t7.baidu.com/it/u=825057118,3516313570&fm=193&f=GIF',
  'https://t7.baidu.com/it/u=3435942975,1552946865&fm=193&f=GIF',
  'https://t7.baidu.com/it/u=1785207335,3397162108&fm=193&f=GIF',
  'https://t7.baidu.com/it/u=2581522032,2615939966&fm=193&f=GIF',
  'https://t7.baidu.com/it/u=3423293041,3900166648&fm=193&f=GIF',
  'https://t7.baidu.com/it/u=1417505637,1247476664&fm=193&f=GIF',
];

function getRandomImgUrl(): string {
  const i = random(ImageUrlList.length - 1);
  return ImageUrlList[i];
}

export function getImgUrlArray(length: number = 1): Array<string> {
  const r = [];
  for (let i = 1; i <= length; i++) {
    r.push(getRandomImgUrl());
  }
  return r;
}

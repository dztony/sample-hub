import EventEmitter from "./EventEmitter.ts";
import { ILocation, IListener, IParams } from "./types.ts";

function createHashHistory() {
  let emitter = EventEmitter();
  const location: ILocation = {
    pathname: window.location.hash.slice(1) || '/',
  };

  function handleHashChange() {
    const curParams: IParams = {
      location: {
        pathname: window.location.hash.slice(1),
      },
    };
    emitter.notify(curParams);
  }

  function listen(listener: IListener) {
    return emitter.subscribe(listener);
  }

  function push(curPath: string) {
    console.log('导航 path - ', curPath);
    window.location.hash = curPath;
    console.log('window.location - ', window.location);
  }

  window.addEventListener('hashchange', handleHashChange);

  return {
    listen,
    push,
    location,
  };
}

export default createHashHistory;

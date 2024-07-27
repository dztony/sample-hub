import { IConsumer, IHistory, ILocation, IUnsubscribe } from "./type.ts";
import createEvent from "./createEvent.ts";

function createBrowserHistory(): IHistory {
  const event = createEvent();

  let location: ILocation = {
    pathname: window.location.pathname || '/',
  };

  function listen(c: IConsumer): IUnsubscribe {
    return event.subscribe(c);
  }

  function push(curPath: string): void {
    location = {
      pathname: curPath,
    };

    window.history.pushState(null, '', curPath);
    event.notify(location);
  }

  function handlePopStateChange() {
    location = {
      pathname: window.location.pathname,
    };

    event.notify(location);
  }

  window.addEventListener('popstate', handlePopStateChange)

  return {
    location,
    listen,
    push,
  };
}


export default createBrowserHistory;

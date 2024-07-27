import React from 'react';
import Link from "next/link";

function Index() {
  return (
    <div>
      <h1>
        Index page
      </h1>
      <Link href={'/reduxV1'}>
        redux Provider 版本实现的状态管理页面
      </Link>

      <div style={{ height: 40 }}></div>
      <Link href={'/reduxV2'}>
        useSyncExternalStore hook 实现的状态管理页面
      </Link>
    </div>
  );
}

export default Index;

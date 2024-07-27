import React, { ReactElement, ReactNode } from 'react';

function Father(props: { children: ReactNode}) {
  // console.log('toArray - ', React.Children.toArray(props.children));
  const childNode = React.Children.map(props.children as ReactElement, (item, i) => {

    const newItem = React.cloneElement(
      item,
      {
        ...item.props,
        childIndex: i,
        style: {
          color: 'red'
        },
      },
    )
    return newItem;
  })
  return (
    <div>
      <h3>父组件 - 修改子组件 props</h3>
      <div>子组件个数 - {React.Children.count(props.children)}</div>
      <div>子组件转换成数组后的长度 - {React.Children.toArray(props.children).length}</div>
      {childNode}
    </div>
  );
}


function Child1(props: any) {
  console.log('child 1 - props ', props);
  return (
    <div style={props.style}>
      <h3>childIndex - {props.childIndex}</h3>
      child - 1
    </div>
  );
}

function Child2(props: any) {
  console.log('child 2 - props ', props);
  return (
    <div style={props.style}>
      <h3>childIndex - {props.childIndex}</h3>
      child - 2
    </div>
  );
}

function Child3(props: any) {
  console.log('child 3 - props ', props);
  return (
    <div style={props.style}>
      <h3>childIndex - {props.childIndex}</h3>
      child - 3
    </div>
  );
}

function ReactChildrenTest() {
  return (
    <Father>
      <Child1 />
      <Child2 />
      <Child3 />
    </Father>
  );
}

export default ReactChildrenTest;

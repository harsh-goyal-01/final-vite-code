import React, { ComponentType } from 'react';

type PromiseType = Promise<{ default: ComponentType<any> }>;


interface LazyLoadableComponent extends React.LazyExoticComponent<React.ComponentType<any>> {

  preload: () => PromiseType;

}

export const loadable = (loadFn: () => Promise<{ default: ComponentType<any> }>): LazyLoadableComponent => {

  const Component = React.lazy(loadFn) as LazyLoadableComponent;
  
  Component.preload = loadFn;

  return Component;

};
import React, { ComponentType, ReactElement, Suspense, lazy } from 'react';
import LazyPagePreloader from '@/components/LazyPagePreloader/LazyPagePreloader';

const delay = (): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

const LazyComponent = (importFunction: () => Promise<{ default: ComponentType<unknown> }>): (() => ReactElement) => {
  const LazyPage = lazy(importFunction);

  return (): ReactElement => (
    <Suspense fallback={<LazyPagePreloader />}>
      <LazyPage />
    </Suspense>
  );
};

export const LandingPage = LazyComponent(async () => {
  await delay();
  return import(/* webpackChunkName: "pages/landing/landing" */ '@/pages/LandingPage/LandingPage');
});

export const NotFoundPage = LazyComponent(async () => {
  await delay();
  return import(/* webpackChunkName: "pages/not-found/not-found" */ '@/pages/NotFoundPage/NotFoundPage');
});
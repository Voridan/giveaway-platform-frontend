import { RefObject, useEffect, useRef } from 'react';

type UseObserverParams = {
  loading: boolean;
  node: RefObject<Element>;
  canLoad: boolean;
  callback(): void;
};

const useObserver = ({
  loading,
  canLoad,
  callback,
  node,
}: UseObserverParams) => {
  const observer = useRef<IntersectionObserver>();
  useEffect(() => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && canLoad) {
        callback();
      }
    });
    if (node.current) observer.current.observe(node.current);
  }, [loading, canLoad]);

  return '';
};

export default useObserver;

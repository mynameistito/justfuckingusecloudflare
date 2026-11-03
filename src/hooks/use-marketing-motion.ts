import { useEffect, useRef, useState } from "react";

type NetworkConnection = EventTarget & {
  readonly saveData?: boolean;
  readonly effectiveType?: string;
  readonly downlink?: number;
};

/** Controls decorative motion according to user preferences and visibility. */
export const useMarketingMotion = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [motionAllowed, setMotionAllowed] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [pageVisible, setPageVisible] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [globeVisible, setGlobeVisible] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [networkAllowsVideo, setNetworkAllowsVideo] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setMotionAllowed(!media.matches);
    const updateVisibility = () => setPageVisible(!document.hidden);
    updateMotion();
    updateVisibility();
    media.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      media.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !("IntersectionObserver" in window)) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const element = entry.target;
          if (element instanceof HTMLElement) {
            element.dataset.inView = String(entry.isIntersecting);
          }
          if (entry.isIntersecting) {
            element.classList.add("motion-enter");
          }
          if (element.classList.contains("hero")) {
            setHeroVisible(entry.isIntersecting);
          }
          if (element.classList.contains("globe-wrap")) {
            setGlobeVisible(entry.isIntersecting);
          }
        }
      },
      { threshold: 0.05 }
    );
    for (const element of root.querySelectorAll("[data-motion-region]")) {
      observer.observe(element);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // SAFETY: This optional browser API is absent from TypeScript's DOM declarations.
    const { connection } = navigator as Navigator & {
      connection?: NetworkConnection;
    };
    const updateNetwork = () => {
      const fastType =
        !connection?.effectiveType || connection.effectiveType === "4g";
      const fastLink =
        connection?.downlink === undefined || connection.downlink >= 3;
      setNetworkAllowsVideo(!connection?.saveData && fastType && fastLink);
    };
    updateNetwork();
    connection?.addEventListener("change", updateNetwork);
    return () => connection?.removeEventListener("change", updateNetwork);
  }, []);

  useEffect(() => {
    if (!motionAllowed || !playing || !pageVisible || !heroVisible) {
      return;
    }
    if (!networkAllowsVideo) {
      return;
    }
    const timer = window.setTimeout(() => setVideoReady(true), 200);
    return () => window.clearTimeout(timer);
  }, [motionAllowed, playing, pageVisible, heroVisible, networkAllowsVideo]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }
    const shouldPlay = motionAllowed && playing && pageVisible && heroVisible;
    if (shouldPlay && videoReady && networkAllowsVideo) {
      const playVideo = async () => {
        try {
          await video.play();
        } catch {
          // The poster remains visible when autoplay is blocked.
        }
      };
      void playVideo();
    } else {
      video.pause();
      if (!networkAllowsVideo || !motionAllowed) {
        video.load();
      }
    }
  }, [
    motionAllowed,
    playing,
    pageVisible,
    heroVisible,
    videoReady,
    networkAllowsVideo,
  ]);

  const motionRunning = motionAllowed && playing && pageVisible;
  return {
    globeVisible,
    motionAllowed,
    motionRunning,
    playing,
    rootRef,
    setPlaying,
    videoReady: videoReady && networkAllowsVideo && motionAllowed,
    videoRef,
  };
};

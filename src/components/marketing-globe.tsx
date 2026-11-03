import { GlobeMap, LayerCard, Text } from "@cloudflare/kumo";
import { useEffect, useRef, useState } from "react";

const locations = [
  {
    description: "Apps, data, and security on one platform.",
    latitude: 37.8,
    longitude: -122.4,
    name: "One platform",
  },
  {
    description: "Less vendor juggling, more building.",
    latitude: 40.7,
    longitude: -74,
    name: "One bill",
  },
  {
    description: "Object storage with zero egress fees.",
    latitude: 51.5,
    longitude: -0.1,
    name: "R2 storage",
  },
  {
    description: "Run your code close to users at the edge.",
    latitude: 35.7,
    longitude: 139.7,
    name: "Workers",
  },
  {
    description: "300+ edge locations worldwide.",
    latitude: -33.9,
    longitude: 151.2,
    name: "Global network",
  },
];

interface MarketingGlobeProps {
  readonly autoRotate: boolean;
}

/** Interactive globe with callouts attached to Kumo's projected markers. */
export const MarketingGlobe: React.FC<MarketingGlobeProps> = ({
  autoRotate,
}) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState(locations[0]);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) {
      return;
    }
    let frame: number | null = null;
    const update = () => {
      frame = null;
      const bounds = scene.getBoundingClientRect();
      const markers = scene.querySelectorAll("[data-globe-marker]");
      const updateCallout = (location: (typeof locations)[number]) => {
        const label = [
          ...scene.querySelectorAll<HTMLElement>("[data-callout]"),
        ].find((element) => element.dataset.callout === location.name);
        if (!(label instanceof HTMLElement)) {
          return;
        }
        const marker = [...markers].find(
          (element) =>
            element.getAttribute("aria-label") ===
            `${location.name}: ${location.description}`
        );
        const matrix =
          marker instanceof SVGCircleElement ? marker.getScreenCTM() : null;
        if (!(marker instanceof SVGCircleElement) || !matrix) {
          label.style.opacity = "0";
          return;
        }
        const point = new DOMPoint(
          marker.cx.baseVal.value,
          marker.cy.baseVal.value
        ).matrixTransform(matrix);
        const halfWidth = label.offsetWidth / 2;
        const x = Math.max(
          halfWidth + 4,
          Math.min(bounds.width - halfWidth - 4, point.x - bounds.left)
        );
        const y = Math.max(
          label.offsetHeight + 4,
          Math.min(bounds.height - 4, point.y - bounds.top - 12)
        );
        label.style.transform = `translate(${x}px, ${y}px) translate(-50%, -100%)`;
        label.style.opacity = marker.getAttribute("opacity") ?? "1";
      };
      for (const location of locations) {
        updateCallout(location);
      }
    };
    const schedule = () => {
      if (frame === null) {
        frame = requestAnimationFrame(update);
      }
    };
    // Kumo owns the rotation, including its auto-rotation clock. Observe its
    // rendered markers so callouts always use that exact projection.
    const mutations = new MutationObserver(schedule);
    mutations.observe(scene, {
      attributeFilter: ["cx", "cy", "opacity"],
      attributes: true,
      childList: true,
      subtree: true,
    });
    const resize = new ResizeObserver(schedule);
    resize.observe(scene);
    schedule();
    return () => {
      mutations.disconnect();
      resize.disconnect();
      if (frame !== null) {
        cancelAnimationFrame(frame);
      }
    };
  }, []);

  return (
    <div className="globe-wrap" data-motion-region>
      <div ref={sceneRef} className="globe-scene">
        <div className="globe">
          <GlobeMap
            aria-label="Interactive Cloudflare network globe"
            landColor="var(--text-color-kumo-brand)"
            landHatchSpacing={5}
            oceanColor="transparent"
            showGraticule
            isDarkMode
            draggable
            autoRotate={autoRotate}
            autoRotateSpeed={3}
            showTooltip={false}
            defaultRotation={[-145, -20, -15]}
            markers={locations}
            markerColor="var(--text-color-kumo-brand)"
            onMarkerClick={(marker) => {
              const location = locations.find(
                (item) => item.name === marker.name
              );
              if (location) {
                setSelected(location);
              }
            }}
          />
        </div>
        {locations.map((location) => (
          <LayerCard
            key={location.name}
            className="globe-callout"
            data-callout={location.name}
            aria-hidden="true"
          >
            <Text>{location.name}</Text>
            <Text variant="secondary">{location.description}</Text>
          </LayerCard>
        ))}
      </div>
      <div className="globe-instructions">
        <Text variant="secondary">
          Drag the globe or use the arrow keys to rotate. Select a marker to
          learn more.
        </Text>
        <Text aria-live="polite">
          {selected.name}: {selected.description}
        </Text>
      </div>
    </div>
  );
};

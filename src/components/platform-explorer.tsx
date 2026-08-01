import {
  ArrowSquareOut,
  Brain,
  Broadcast,
  CloudArrowUp,
  Database,
  ShieldCheck,
} from "@phosphor-icons/react";
import { useState } from "react";

import { MotionReveal } from "@/components/motion-reveal";

import { PRODUCT_GROUPS, PRODUCTS } from "../content/products";
import type { ProductGroupId } from "../content/products";

const GroupIcon = ({ groupId }: { readonly groupId: ProductGroupId }) => {
  switch (groupId) {
    case "ship": {
      return <CloudArrowUp aria-hidden="true" weight="duotone" />;
    }
    case "store": {
      return <Database aria-hidden="true" weight="duotone" />;
    }
    case "coordinate": {
      return <Broadcast aria-hidden="true" weight="duotone" />;
    }
    case "ai": {
      return <Brain aria-hidden="true" weight="duotone" />;
    }
    case "deliver": {
      return <CloudArrowUp aria-hidden="true" weight="duotone" />;
    }
    case "protect": {
      return <ShieldCheck aria-hidden="true" weight="duotone" />;
    }
    default: {
      return null;
    }
  }
};

/**
 * Job-oriented platform browser backed by verified official product links.
 *
 * @returns Category controls and the active product list.
 */
export const PlatformExplorer = () => {
  const [activeGroup, setActiveGroup] = useState<ProductGroupId>("ship");
  const group = PRODUCT_GROUPS.find(
    (candidate) => candidate.id === activeGroup
  );
  const products = PRODUCTS.filter((product) => product.group === activeGroup);

  return (
    <section
      className="section platform-section"
      id="platform"
      aria-labelledby="platform-title"
    >
      <MotionReveal className="section-heading">
        <h2 id="platform-title">Start with the job. Choose the primitive.</h2>
        <p>
          Cloudflare is a toolbox, not a checklist. Use the products that earn
          their place.
        </p>
      </MotionReveal>

      <MotionReveal className="platform-explorer" delay={0.08}>
        <fieldset className="group-tabs" aria-label="Product categories">
          {PRODUCT_GROUPS.map((candidate) => (
            <button
              type="button"
              className={
                activeGroup === candidate.id
                  ? "group-tab is-active"
                  : "group-tab"
              }
              aria-pressed={activeGroup === candidate.id}
              key={candidate.id}
              onClick={() => setActiveGroup(candidate.id)}
            >
              <GroupIcon groupId={candidate.id} />
              <span>{candidate.name}</span>
            </button>
          ))}
        </fieldset>

        <div
          className="platform-products"
          id="platform-products"
          aria-live="polite"
        >
          <div className="platform-group-intro">
            <span>{group?.name}</span>
            <p>{group?.strapline}</p>
          </div>
          <div className="product-rows">
            {products.map((product) => (
              <a
                href={product.docsUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`${product.name} documentation (opens in a new tab)`}
                className="product-row"
                key={product.id}
              >
                <div className="product-name">
                  <strong>{product.name}</strong>
                  {product.maturity === undefined ? null : (
                    <small>{product.maturity}</small>
                  )}
                </div>
                <span>{product.description}</span>
                <ArrowSquareOut aria-hidden="true" weight="bold" />
              </a>
            ))}
          </div>
        </div>
      </MotionReveal>
    </section>
  );
};

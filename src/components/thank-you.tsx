import { Banner } from "@cloudflare/kumo";
import type React from "react";

interface ThankYouProps {
  from: string;
}

export const ThankYou: React.FC<ThankYouProps> = ({ from }) => {
  return (
    <section className="border-kumo-line border-b bg-kumo-canvas px-6 py-12">
      <div className="mx-auto max-w-4xl text-center">
        <Banner
          title={`Don't forget to fucking thank ${from}`}
          variant="default"
        >
          They're looking out for you.
        </Banner>
      </div>
    </section>
  );
};

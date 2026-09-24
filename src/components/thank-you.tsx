import type React from "react";

interface ThankYouProps {
  from: string;
}

export const ThankYou: React.FC<ThankYouProps> = ({ from }) => (
  <section className="border-line bg-surface border-b px-6 py-12">
    <div className="mx-auto max-w-4xl text-center">
      <p className="text-muted-foreground font-mono text-lg md:text-xl">
        Don&apos;t forget to fucking thank{" "}
        <span className="text-brand font-bold">{from}</span> for sending you
        this link. They&apos;re looking out for you.
      </p>
    </div>
  </section>
);

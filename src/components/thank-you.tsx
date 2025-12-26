import type React from "react";

interface ThankYouProps {
  from: string;
}

export const ThankYou: React.FC<ThankYouProps> = ({ from }) => {
  return (
    <section className="border-neutral-800 border-b bg-neutral-950 px-6 py-12">
      <div className="mx-auto max-w-4xl text-center">
        <p className="font-mono text-lg text-neutral-400 md:text-xl">
          Don't forget to fucking thank{" "}
          <span className="font-bold text-orange-500">{from}</span> for sending
          you this link. They're looking out for you.
        </p>
      </div>
    </section>
  );
};


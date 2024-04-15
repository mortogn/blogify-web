import React, { FC } from "react";

type Props = {
  heading: string;
  description: string;
};

const SectionHeading: FC<Props> = ({ description, heading }) => {
  return (
    <div className="space-y-1">
      <h2 className="font-semibold tracking-tight text-3xl">{heading}</h2>
      <p className="tracking-wide text-zinc-700">{description}</p>
    </div>
  );
};

export default SectionHeading;

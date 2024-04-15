import React, { FC } from "react";

type Props = {
  heading: string;
  description: string;
};

const PageHeading: FC<Props> = ({ description, heading }) => {
  return (
    <div className="space-y-1 mt-8">
      <h1 className="font-space-grotesk text-4xl font-medium tracking-tight">{heading}</h1>
      <p className="tracking-wide text-zinc-700">{description}</p>
    </div>
  );
};

export default PageHeading;

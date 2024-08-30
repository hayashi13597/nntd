import Image from "next/image";
import React from "react";

type CowProps = {
  id: string;
  top: number;
};

const Cow = ({ id, top }: CowProps) => {
  return (
    <div id={id} style={{ position: "absolute", left: 0, top: top }}>
      <Image
        src={require("@/public/running-cow.gif")}
        alt="cow"
        width={50}
        height={50}
        priority={false}
        style={{ width: "50px", height: "50px", objectFit: "contain" }}
      />
    </div>
  );
};

export default Cow;

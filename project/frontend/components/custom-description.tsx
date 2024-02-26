"use client";
import { useState } from "react";

export default function CustomDescription({
  text,
  minRow,
}: {
  text: string;
  minRow?: number;
}) {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="space-y-2">
      <p className={`text-primary/80 ${!showMore && `line-clamp-${minRow}`}`}>
        {text}
      </p>
      <div className="cursor-pointer" onClick={() => setShowMore(!showMore)}>
        {!showMore ? <>Read more</> : <>Show less</>}
      </div>
    </div>
  );
}

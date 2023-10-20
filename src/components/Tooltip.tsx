import React, { ReactNode, useEffect, useState } from "react";

export const Tooltip = ({
  message,
  children,
}: {
  message: string;
  children: ReactNode;
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (show) {
      timeoutId = setTimeout(() => setShow(false), 1000);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [show]);

  return (
    <div className="relative flex flex-col items-center group">
      <span className="flex justify-center" onClick={() => setShow(true)}>
        {children}
      </span>
      <div
        className={`absolute whitespace-nowrap bottom-full flex flex-col items-center ${
          !show ? "hidden" : null
        }`}
      >
        <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-gray-600 shadow-lg rounded-md">
          {message}
        </span>
        <div className="w-3 h-3 -mt-2 rotate-45 bg-gray-600" />
      </div>
    </div>
  );
};

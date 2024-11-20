import React from "react";
import { usePageContext } from "vike-react/usePageContext";

export default function Page() {
  const { is404 } = usePageContext();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      {is404 ? (
        <>
          <h1 className="text-8xl font-bold text-gray-800">404</h1>
          <h2 className="text-2xl font-semibold mt-4 text-gray-700">
            Page Not Found
          </h2>
          <p className="mt-2 text-gray-600">
            Sorry, the page you are looking for doesn't exist.
          </p>
        </>
      ) : (
        <>
          <h1 className="text-8xl font-bold text-gray-800">500</h1>
          <h2 className="text-2xl font-semibold mt-4 text-gray-700">
            Internal Server Error
          </h2>
          <p className="mt-2 text-gray-600">
            Sorry, something went wrong on our end. Please try again later.
          </p>
        </>
      )}
      <a
        href="/"
        className="mt-8 px-6 py-3 bg-stone-600 text-white rounded-lg hover:bg-stone-700 transition-colors duration-200 font-medium"
      >
        Return to Home
      </a>
    </div>
  );
}

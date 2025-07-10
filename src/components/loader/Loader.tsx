"use client";

export const Loader = () => {
  return (
    <div className="fixed inset-0 z-[999999] bg-black bg-opacity-40 flex justify-center items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-75"></div>
    </div>
  );
};

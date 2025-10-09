import { Spinner } from "flowbite-react";

export function LoadingSpinner() {
  return (
    <div className="flex justify-center mt-14 gap-3 text-white">
      <Spinner aria-label="loading characters" size="xl" light />
      <span className="text-5xl">Loading...</span>
    </div>
  );
}

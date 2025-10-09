import { createTheme } from "flowbite-react";

export const paginationTheme = createTheme({
  pagination: {
    pages: {
      base: "xs:mt-0 mt-2 inline-flex items-center -space-x-px text-md font-bold",
      showIcon: "inline-flex",
      previous: {
        base: "ml-0 rounded-l-lg border border-orange-600 bg-radial from-amber-200 to-orange-400 px-3 py-2 leading-tight text-gray-600 enabled:cursor-pointer enabled:hover:bg-radial enabled:hover:from-amber-300 enabled:hover:to-orange-600 enabled:hover:text-white",
        icon: "h-5 w-5",
      },
      next: {
        base: "cursor-pointer rounded-r-lg border border-orange-600 bg-radial from-amber-200 to-orange-400 px-3 py-2 leading-tight text-gray-600 enabled:hover:bg-radial enabled:hover:from-amber-300 enabled:hover:to-orange-600 enabled:hover:text-white",
        icon: "h-5 w-5",
      },
      selector: {
        base: "cursor-pointer w-12 border border-orange-600 bg-radial from-amber-200 to-orange-400 py-2 leading-tight text-gray-600 enabled:hover:bg-radial enabled:hover:from-amber-300 enabled:hover:to-orange-600 enabled:hover:text-white",
        active:
          "bg-radial border !border-orange-600 from-amber-300 to-orange-600 text-white",
        disabled: "cursor-not-allowed opacity-40",
      },
    },
  },
});

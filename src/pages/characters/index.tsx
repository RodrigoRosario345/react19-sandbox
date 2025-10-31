import { Pagination, ThemeProvider } from "flowbite-react";
import type { Character, RootObject } from "@/interfaces/character.model";
import getCharacters from "@/services/getCharacters";
import { useFetch, usePagination } from "@/hooks";
import { paginationTheme } from "@/themes/pagination.theme";
import FuzzyText, { CardDBZ, LoadingSpinner, Title } from "@/components";

export default function CharactersPage() {
  const { currentPage, goToPage } = usePagination();
  const { data, loading, error } = useFetch<RootObject>({
    currentPage,
    getData: getCharacters,
  });

  const onPageChange = (page: number) => {
    goToPage(page);
  };

  return (
    <>
      <Title>
        <span className="text-white">PERSONAJES</span>
      </Title>
      {loading && <LoadingSpinner />}
      {error && <FuzzyText>{error.message}</FuzzyText>}
      {data && (
        <>
          <div className="grid grid-cols-(--grid-cols-saiyan-cards) gap-5 justify-items-center-safe mb-4 group/cards">
            {data.items.map((character: Character) => (
              <CardDBZ key={character.id} {...character} />
            ))}
          </div>
          <div className="flex overflow-x-auto sm:justify-center font-sans font-medium">
            <ThemeProvider theme={paginationTheme}>
              <Pagination
                currentPage={data.meta.currentPage}
                totalPages={data.meta.totalPages}
                onPageChange={onPageChange}
                showIcons
                applyTheme={{
                  pages: "replace",
                }}
              />
            </ThemeProvider>
          </div>
        </>
      )}
    </>
  );
}

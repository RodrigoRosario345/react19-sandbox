export interface RootObject {
  items: Character[];
  meta: Meta;
  links: Links;
}

interface Links {
  first: string;
  previous: string;
  next: string;
  last: string;
}

export interface Meta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface Character {
  id: number;
  name: string;
  ki: string;
  maxKi: string;
  race: string;
  gender: string;
  description: string;
  image: string;
  affiliation: string;
  deletedAt: null;
}

export const emptyCharacter: Character[] = [];
export const emptyMeta: Meta = {
  totalItems: 0,
  itemCount: 0,
  itemsPerPage: 0,
  totalPages: 0,
  currentPage: 0,
};

export const emptyRootObject: RootObject = {
  items: emptyCharacter,
  meta: emptyMeta,
  links: {
    first: "",
    previous: "",
    next: "",
    last: "",
  },
};

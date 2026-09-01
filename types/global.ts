export type GenreType={
    id:string;
    name:string;
};

export type MovieType={
    id:string;
    title:string;
    overview:string;
    poster_path:string|null;
    backdrop_path:string|null;
    release_date:string;
    vote_average:number;
    runtime?:number;
    tagline?:string;
    genres?:GenreType[];
    character:string;
};

export type VideoType={
    id:string;
    key:string;
    name:string;
    site:string;
    type:string;
    official?:boolean;
}

export type PersonType={
    id:string;
    name:string;
    character?:string;
    profile_path:string|null;
    biography?:string;
    birthday:string;
    place_of_birth?:string;
    known_for_department?:string;
}
export interface IUser {
  username?: string;
  email: string;
  password: string;
  returnSecureToken?: boolean;
  favorites?: IFavorites[];
}

export interface IFavorites {
  searchItem: string;
}

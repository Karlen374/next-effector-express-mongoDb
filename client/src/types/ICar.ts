export interface ICar {
  id: string;
  brand: string;
  model: string;
  price: number;
  releaseYear: number;
  description: string;
  viewed: boolean;
  userId:string;
  userName:string;
  carPhoto?:string;
  likedUsersId?:Array<string>;
  viewedUsersId?:Array<string>;
}

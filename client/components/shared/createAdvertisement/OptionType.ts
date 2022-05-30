export interface OptionType {
  inputValue?: string;
  title: string;
}
export interface IParams {
  inputValue: string;
  getOptionLabel:(option: OptionType)=>string;
}

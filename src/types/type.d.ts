export interface IOptionItem {
  label: string,
  value: string
}

export interface IUser {
  _id: string,
  id: string,
  first_name: string,
  last_name: string,
  email: string,
  address: string,
  city: string,
  country: string,
  state: string,
  billing: boolean,
  role: string
}
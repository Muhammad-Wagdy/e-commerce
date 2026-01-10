export interface Session{
  url :string;
  success_url : string;
  cancel : string;
}
export interface IOnlinePaymentResponse{
  status:string;
  session : Session;
}

export enum Alerts {
  Connected,
  NoMetaMask,
  MetaMask,
}

export enum SozlukError {
    NoAccount = "No account found. this is probably caused by not connecting to the metamask.",
    AccountNotRequested = `Dont have permission from metamask to get account details. use await provider.send("eth_requestAccounts, [])."`
    
}
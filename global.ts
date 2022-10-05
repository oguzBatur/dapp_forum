declare global {
    interface Window {
        ethereum: import('ethers').providers.ExternalProvider
    }
}

export const ethereum = window.ethereum;
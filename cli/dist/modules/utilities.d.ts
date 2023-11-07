export declare const getTarballShasum: (tarballPath: string) => Promise<string>;
export declare function signMessage(message: string): Promise<string>;
export declare const jwkToAddress: (jwk?: import("arweave/node/lib/wallet.js").JWKInterface | "use_wallet" | undefined) => Promise<string>;
export declare const createKey: () => Promise<import("arweave/node/lib/wallet.js").JWKInterface>;

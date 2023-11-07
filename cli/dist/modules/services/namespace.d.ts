export declare const namespace: {
    addressIsRegistered: (address: string) => Promise<boolean>;
    resolve: (domain: string) => Promise<{
        domain: string;
        owner: string;
        tx_id: string;
    } | undefined>;
    mint: (domain: string, tx_id: string) => Promise<unknown>;
    update: (domain: string, tx_id: string) => Promise<unknown>;
};

export interface IWindowOpenOptions {
    width: number;
    height: number;
}
export interface IisAlreadyOpened {
    opened: boolean;
    message: string;
}
export declare type ICallback = (resolve: (arg0: any) => void, reject: (arg0: string) => void) => {};
export declare const connect: (url: string, options?: IWindowOpenOptions | {}) => Promise<PromiseConstructor>;
export declare const isAlreadyOpened: () => IisAlreadyOpened;
declare const _default: {
    connect: (url: string, options?: {} | IWindowOpenOptions) => Promise<PromiseConstructor>;
    isAlreadyOpened: () => IisAlreadyOpened;
};
export default _default;

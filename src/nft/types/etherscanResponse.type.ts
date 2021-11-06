export enum EtherscanStatus {
  OK = '0',
  NOT_OK = '1',
}

export type EtherscanResponseType<T> = {
  status: EtherscanStatus;
  message: string;
  result: T;
};

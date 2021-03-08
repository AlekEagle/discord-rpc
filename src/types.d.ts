export interface IPCPresence {
  type: number;
  payload: any;
}

export interface User {
  avatar: string;
  bot: boolean;
  discriminator: string;
  flags: number;
  id: string;
  premium_type: number;
  username: string;
}

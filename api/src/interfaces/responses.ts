
export interface ResponseFunctionsInterface {
   success: boolean;
   data?: any;
   error?: unknown;
   message?: string;
}

export interface ResponseClientInterface {
   status: number;
   message: string;
   data: any;
}

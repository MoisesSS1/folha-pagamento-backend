import { Request, Response } from "express";
export declare const cal_sheet: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const save_sheet: (req: Request, res: Response) => Promise<void>;
export declare const search_sheet: (req: Request, res: Response) => void;

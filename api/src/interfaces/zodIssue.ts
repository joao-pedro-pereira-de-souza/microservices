import { ZodIssue } from 'zod';

export type IZodIssue = ZodIssue & {
    expected: string;
};

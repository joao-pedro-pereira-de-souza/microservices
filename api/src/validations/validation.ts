import { ZodSchema } from 'zod';
import { IZodIssue } from '@interfaces/zodIssue';

export type IResponseZodValidation = {
    notSuccess: boolean;
    response: any;
};

async function validate<T>(schema: ZodSchema<T>, object: unknown): Promise<IResponseZodValidation> {
    const validation = await schema.safeParseAsync(object);
    if (validation.success === false) {
        const firstError = validation.error.errors[0] as IZodIssue;
        return {
            notSuccess: true,
            response: {
                status: 422,
                message: firstError.message,
                result: null,
                name: `Envie corretamente o ${firstError.path[0]} em formato ${firstError.expected}.`,
                error: 'Unprocessable Entity.',
            },
        };
    }
    return {
        notSuccess: false,
        response: validation.data,
    };
}

export { validate };

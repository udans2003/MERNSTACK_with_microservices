import { z } from "zod";

const medicineFields = {
    medicineName: z
        .string()
        .min(3, "Medicine name must be at least 3 characters"),

    category: z
        .string()
        .min(1, "Category is required"),

    manufacturer: z
        .string()
        .min(2, "Manufacturer is required"),

    stock: z
        .number({
            required_error: "Stock is required"
        })
        .int("Stock must be an integer")
        .positive("Stock must be greater than 0"),

    expiryDate: z
        .string()
        .min(1, "Expiry date is required")
};

export const medicineCreateSchema = z.object({

    medicineCode: z
        .string()
        .min(1, "Medicine code is required")
        .trim(),

    ...medicineFields
});

export const medicineUpdateSchema = z.object({
    medicineCode: z
        .string()
        .min(1, "Medicine code is required")
        .trim()
        .optional(),

    ...medicineFields
});

export const medicineSchema = medicineCreateSchema;
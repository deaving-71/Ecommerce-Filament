import { Product } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getHighestPricedProduct(products: Product[]) {
    let max = 0;
    products.forEach((product) => {
        const price = Number(product.price);
        if (price > max) {
            max = price;
        }
    });

    return max;
}

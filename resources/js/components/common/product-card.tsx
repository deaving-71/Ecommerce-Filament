import { Product } from "@/types";
import { H3, P } from ".";
import { Button } from "../ui/button";

export function ProductCard({...product}: Product) {
   const price =new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(product.price))
    return <article className="p-3 border rounded-md">
        <img 
        src={"./storage/" + product.thumbnail} 
        alt={product.name} 
        loading="lazy"
        className="h-48 object-contain object-center" 
        />
        <H3 className="text-lg pt-3">{product.name}</H3>
        <P className="text-muted-foreground text-[12px] uppercase">COLLECTION NAME</P>
        <P className="text-primary">{price}</P>
        <Button type="button" className="uppercase mt-2 w-full">Add To Cart</Button>
    </article>;
}

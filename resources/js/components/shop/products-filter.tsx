import { router } from "@inertiajs/react";
import { H2, H3 } from "../common";
import { CollectionsProps } from "../home";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { formatPrice } from "@/lib/format";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { CheckedState } from "@radix-ui/react-checkbox";

export type ProductsFilterProps = CollectionsProps & {
    highestPriceProducts: number;
};
export function ProductsFilter({
    collections,
    highestPriceProducts,
}: ProductsFilterProps) {
    const [priceRange, setPriceRange] = useState([0, highestPriceProducts]);
    const searchParams = new URLSearchParams(window.location.search);
    const selectedCollections = searchParams.getAll("collections[]");

    function getFilteredProducts(opts?: any) {
        const filters = {
            collections: selectedCollections,
            prices: priceRange,
            ...opts,
        };
        router.get("/shop", filters, {
            preserveState: true,
            only: ["products"],
        });
    }

    return (
        <div className=" mr-4 hidden basis-[260px] border-r pr-4 2md:block">
            <H2 className="pb-6">Filter</H2>

            <div className="space-y-6">
                {/*//* COLLECTIONS */}
                <div>
                    <H3 className="pb-2 text-base font-normal text-foreground">
                        Collections
                    </H3>
                    <ul>
                        {collections.map((collection, idx) => (
                            <li
                                key={collection.name + idx}
                                className="flex items-center gap-2"
                            >
                                <Checkbox
                                    id={collection.name}
                                    checked={selectedCollections.includes(
                                        collection.slug,
                                    )}
                                    onCheckedChange={(checked) => {
                                        const newSelectedCollections = checked
                                            ? [
                                                  ...selectedCollections,
                                                  collection.slug,
                                              ]
                                            : selectedCollections.filter(
                                                  (slug) =>
                                                      slug !== collection.slug,
                                              );

                                        getFilteredProducts({
                                            collections: newSelectedCollections,
                                        });
                                    }}
                                />
                                <Label
                                    htmlFor={collection.name}
                                    className="text-foreground/80"
                                >
                                    {collection.name}
                                </Label>
                            </li>
                        ))}
                    </ul>
                </div>

                {/*//* PRICE RANGE */}
                <div>
                    <H3 className="pb-5 text-base font-normal text-foreground">
                        Range
                    </H3>
                    <Slider
                        className="pb-5"
                        defaultValue={priceRange}
                        max={highestPriceProducts}
                        step={1}
                        minStepsBetweenThumbs={10}
                        onValueCommit={(values: number[]) => {
                            setPriceRange(values);
                            getFilteredProducts({ prices: values });
                        }}
                    />
                    <div className="flex items-center gap-8">
                        <Input value={formatPrice(priceRange[0]!)} />
                        <Input value={formatPrice(priceRange[1]!)} />
                    </div>
                </div>
            </div>
        </div>
    );
}

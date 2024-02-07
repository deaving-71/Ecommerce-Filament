import { Link, router } from "@inertiajs/react";
import { H2, H3 } from "../common";
import { Collections, CollectionsProps } from "../home";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { formatPrice } from "@/lib/format";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

export type ProductsFilterProps = CollectionsProps;
export function ProductsFilter({ collections }: ProductsFilterProps) {
    const [priceRange, setPriceRange] = useState([0, 100]);
    const [selectedCollections, setSelectedCollections] = useState<string[]>(
        [],
    );

    return (
        <div className=" 2md:block mr-4 hidden basis-[260px] border-r pr-4">
            <H2 className="pb-6">Filter</H2>

            <div className="space-y-6">
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
                                        console.log("checked: ", checked);

                                        const newSelectedCollections = [
                                            ...selectedCollections,
                                        ];

                                        checked
                                            ? newSelectedCollections.push(
                                                  collection.slug,
                                              )
                                            : newSelectedCollections.filter(
                                                  (c) => c !== collection.slug,
                                              );

                                        setSelectedCollections(
                                            newSelectedCollections,
                                        );
                                        router.get(
                                            "/shop",
                                            {
                                                collections:
                                                    newSelectedCollections,
                                            },

                                            {
                                                preserveState: true,
                                            },
                                        );
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

                <div>
                    <H3 className="pb-5 text-base font-normal text-foreground">
                        Range
                    </H3>
                    <Slider
                        className="pb-5"
                        defaultValue={priceRange}
                        step={1}
                        minStepsBetweenThumbs={10}
                        onValueChange={(value: number[]) =>
                            setPriceRange(value)
                        }
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

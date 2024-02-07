import { Link } from "@inertiajs/react";
import { Section } from "../common";
import { Button } from "../ui/button";

export function Hero() {
    return (
        <Section aria-labelledby="hero" className="relative pt-0">
            <img
                src="https://placekitten.com/g/1920/600"
                className="h-[450px] object-cover object-center md:h-[600px]"
                width={1920}
                height={600}
                loading="eager"
            />
            <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 translate-y-1/2 text-center">
                <Button size="lg" className="text-lg uppercase" asChild>
                    <Link href="/shop">Shop Now</Link>
                </Button>
            </div>
        </Section>
    );
}
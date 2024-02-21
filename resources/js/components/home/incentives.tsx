import { Section } from "../common"
import { Icons } from "../icons"

const incentives = [
  {
    title: "Free Shipping",
    description: "Minimum order 20$",
    icon: Icons.truck,
  },
  {
    title: "24/7 Support",
    description: "Contact us 24 Hours",
    icon: Icons.headset,
  },
  {
    title: "Best Prices & Offers",
    description: "Order $100 or more",
    icon: Icons.badgePercent,
  },
  {
    title: "Easy Returns",
    description: "Within 30 days",
    icon: Icons.refresh,
  },
]
export function Incentives() {
  return (
    <Section aria-labelledby="incentives">
      <ul className="xs:grid-cols-2 xs:gap-4 grid place-content-center gap-8 lg:grid-cols-4">
        {incentives.map((incentive, idx) => (
          <li
            key={incentive.title + idx}
            className="place-content-center md:grid"
          >
            <div className="flex items-center gap-4">
              <incentive.icon size={32} />
              <div className="ml-3">
                <h3 className="font-medium text-foreground md:text-xl">
                  {incentive.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground md:text-base">
                  {incentive.description}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}

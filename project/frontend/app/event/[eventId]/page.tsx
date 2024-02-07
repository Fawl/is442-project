import EventCheckoutForm from "@/components/forms/event-checkout-form";
import { MapPinIcon } from "lucide-react";

export default function SpecificEventPage() {
  return (
    <>
      <div className="bg-muted aspect-[16:9] h-[240px] rounded-lg"></div>
      <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
        <section className="w-full md:w-2/3 space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-medium line-clamp-1">
              Generative AI Hackathon
            </h2>
            <p className="text-sm text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. In
              arcu cursus euismod quis. Eu mi bibendum neque egestas congue
              quisque. In dictum non consectetur a. Fermentum leo vel orci
              porta. Aenean sed adipiscing diam donec adipiscing tristique risus
              nec. At imperdiet dui accumsan sit amet nulla facilisi morbi
              tempus. Odio aenean sed adipiscing diam donec adipiscing tristique
              risus. In dictum non consectetur a erat nam. Eget egestas purus
              viverra accumsan in nisl nisi scelerisque eu. Id cursus metus
              aliquam eleifend mi in nulla posuere sollicitudin. Cras tincidunt
              lobortis feugiat vivamus. Facilisis volutpat est velit egestas dui
              id ornare arcu odio. Suspendisse sed nisi lacus sed viverra tellus
              in hac. Augue neque gravida in fermentum et sollicitudin ac orci
              phasellus. Pellentesque massa placerat duis ultricies lacus sed
              turpis tincidunt. Iaculis at erat pellentesque adipiscing. Blandit
              libero volutpat sed cras ornare arcu dui vivamus arcu.
            </p>
          </div>
        </section>

        <section className="w-full md:w-1/3 space-y-6">
          <div className="space-y-4">
            <div className="text-gray-800 font-medium">When & Where</div>
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center justify-center border w-[50px] rounded-md">
                <span className="text-xs text-center text-muted-foreground font-medium uppercase bg-muted px-2.5 py-1 rounded-t-md w-full">
                  Jun
                </span>
                <span className="py-1">15</span>
              </div>
              <div className="space-y-0.5 tracking-tight">
                <div className="text-sm text-gray-800 font-medium">
                  Saturday, June 15
                </div>
                <div className="text-sm text-muted-foreground">
                  10:00 AM to 5:00PM
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center border w-[50px] h-[50px] rounded-md">
                <MapPinIcon size={24} className="text-muted-foreground" />
              </div>
              <div className="flex flex-col text-sm text-muted-foreground tracking-tight">
                <span className="text-sm text-gray-800 font-medium">
                  80 Stamford Rd, Singapore 178902
                </span>
                <a
                  className="underline underline-offset-[3px]"
                  href="https://goo.gl/maps/8Y5j8v5r5Y3Z8v5r5Y3Z"
                  target="_blank"
                >
                  View on map
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-gray-800 font-medium">Pricing</div>
            <EventCheckoutForm />
          </div>
        </section>
      </div>
    </>
  );
}
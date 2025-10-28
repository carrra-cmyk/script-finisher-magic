import { MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { US_LOCATIONS } from "@/data/locations";

export function LocationDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <MapPin className="h-4 w-4" />
          Location
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 max-h-[500px] overflow-y-auto bg-card z-50">
        {US_LOCATIONS.map((location, index) => (
          <DropdownMenuGroup key={location.state}>
            {index > 0 && <DropdownMenuSeparator />}
            <DropdownMenuLabel className="text-sm font-semibold">
              {location.state}
            </DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <a
                href={`/location/${location.capital.toLowerCase().replace(/\s+/g, "-")}`}
                className="cursor-pointer text-xs"
              >
                {location.capital} (Capital)
              </a>
            </DropdownMenuItem>
            {location.cities.map((city) => (
              <DropdownMenuItem key={city} asChild>
                <a
                  href={`/location/${city.toLowerCase().replace(/\s+/g, "-")}`}
                  className="cursor-pointer text-xs"
                >
                  {city}
                </a>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

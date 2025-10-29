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
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface LocationDropdownProps {
  onLocationSelect?: (locationId: string | null) => void;
  selectedLocation?: string | null;
}

export function LocationDropdown({ onLocationSelect, selectedLocation }: LocationDropdownProps) {
  const { data: locations = [], isLoading } = useQuery({
    queryKey: ["locations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("locations")
        .select("*")
        .eq("country", "USA")
        .order("state")
        .order("city");
      
      if (error) throw error;
      
      // Group by state
      const grouped = data.reduce((acc: any, loc: any) => {
        if (!acc[loc.state]) {
          acc[loc.state] = [];
        }
        acc[loc.state].push(loc);
        return acc;
      }, {});
      
      return Object.entries(grouped).map(([state, cities]: [string, any]) => ({
        state,
        cities,
      }));
    },
  });

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
        {isLoading ? (
          <div className="p-4 text-center text-sm text-muted-foreground">
            Loading locations...
          </div>
        ) : locations.length === 0 ? (
          <div className="p-4 text-center text-sm text-muted-foreground">
            No locations available
          </div>
        ) : (
          locations.map((location: any, index: number) => (
            <DropdownMenuGroup key={location.state}>
              {index > 0 && <DropdownMenuSeparator />}
              <DropdownMenuLabel className="text-sm font-semibold">
                {location.state}
              </DropdownMenuLabel>
              {location.cities?.map((city: any) => (
                <DropdownMenuItem 
                  key={city.id}
                  onClick={() => onLocationSelect?.(city.id)}
                  className="cursor-pointer text-xs"
                >
                  {city.city}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

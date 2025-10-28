import { ChevronDown } from "lucide-react";
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
import { CATEGORIES } from "@/data/categories";

export function CategoryDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          Categories
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 max-h-[500px] overflow-y-auto bg-card z-50">
        {Object.entries(CATEGORIES).map(([key, category], index) => (
          <DropdownMenuGroup key={key}>
            {index > 0 && <DropdownMenuSeparator />}
            <DropdownMenuLabel className="text-sm font-semibold">
              {category.name}
            </DropdownMenuLabel>
            {category.items.map((item) => (
              <DropdownMenuItem key={item.id} asChild>
                <a href={item.path} className="cursor-pointer">
                  {item.label}
                </a>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

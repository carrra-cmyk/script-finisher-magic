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
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface CategoryDropdownProps {
  onCategorySelect?: (categoryId: string | null) => void;
  selectedCategory?: string | null;
}

export function CategoryDropdown({ onCategorySelect, selectedCategory }: CategoryDropdownProps) {
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("display_order");
      
      if (error) throw error;
      
      const parents = data.filter(c => !c.parent_id);
      const children = data.filter(c => c.parent_id);
      
      return parents.map(parent => ({
        ...parent,
        items: children.filter(c => c.parent_id === parent.id)
      }));
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          Categories
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 max-h-[500px] overflow-y-auto bg-card z-50">
        {categories.map((category, index) => (
          <DropdownMenuGroup key={category.id}>
            {index > 0 && <DropdownMenuSeparator />}
            <DropdownMenuLabel className="text-sm font-semibold">
              {category.name}
            </DropdownMenuLabel>
            {category.items?.map((item: any) => (
              <DropdownMenuItem 
                key={item.id}
                onClick={() => onCategorySelect?.(item.id)}
                className="cursor-pointer"
              >
                {item.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

import { Button } from "@/components/ui/button";
import { Coins, Heart, Menu, User, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { CategoryDropdown } from "@/components/CategoryDropdown";
import { LocationDropdown } from "@/components/LocationDropdown";

interface HeaderProps {
  isAuthenticated?: boolean;
  loveCoins?: number;
  onMenuClick?: () => void;
  onCategorySelect?: (categoryId: string | null) => void;
  onLocationSelect?: (locationId: string | null) => void;
  selectedCategory?: string | null;
  selectedLocation?: string | null;
}

export function Header({ 
  isAuthenticated, 
  loveCoins = 0, 
  onMenuClick,
  onCategorySelect,
  onLocationSelect,
  selectedCategory,
  selectedLocation 
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Heart className="h-6 w-6 text-primary-foreground fill-current" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Love Directory
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-3">
            <CategoryDropdown 
              onCategorySelect={onCategorySelect}
              selectedCategory={selectedCategory}
            />
            <LocationDropdown 
              onLocationSelect={onLocationSelect}
              selectedLocation={selectedLocation}
            />
            <Link to="/about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-3">
              About
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                {/* Post Free Ad Button */}
                <Button variant="default" size="sm" asChild className="gap-2">
                  <Link to="/post-listing">
                    <Plus className="h-4 w-4" />
                    <span className="hidden sm:inline">Post Free Ad</span>
                    <span className="sm:hidden">Post</span>
                  </Link>
                </Button>

                {/* Love Coins Balance */}
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border">
                  <Coins className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{loveCoins} LC</span>
                </div>

                {/* Dashboard Button */}
                <Button variant="outline" size="sm" asChild className="hidden lg:flex">
                  <Link to="/dashboard">Dashboard</Link>
                </Button>

                {/* Profile Button */}
                <Button variant="ghost" size="icon" asChild className="hidden sm:flex">
                  <Link to="/profile">
                    <User className="h-5 w-5" />
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/auth">Sign In</Link>
                </Button>
                <Button variant="default" size="sm" asChild className="hidden sm:flex">
                  <Link to="/auth?mode=signup">Get Started</Link>
                </Button>
              </>
            )}

            {/* Mobile Menu */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={onMenuClick}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
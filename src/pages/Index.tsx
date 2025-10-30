import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { ListingGrid } from "@/components/ListingGrid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, TrendingUp, Sparkles } from "lucide-react";
import { Session } from "@supabase/supabase-js";

const Index = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch user profile for Love Coins balance
  const { data: profile } = useQuery({
    queryKey: ["profile", session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) return null;
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!session?.user?.id,
  });

  // Fetch listings
  const { data: listings = [] } = useQuery({
    queryKey: ["listings", selectedCategory, selectedLocation, searchQuery],
    queryFn: async () => {
      let query = supabase
        .from("listings")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (selectedCategory) {
        query = query.eq("category_id", selectedCategory);
      }

      if (selectedLocation) {
        query = query.eq("location_id", selectedLocation);
      }

      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
      }

      const { data, error } = await query;
      if (error) throw error;

      return data.map((listing) => ({
        id: listing.id,
        title: listing.title || "Untitled",
        tagline: listing.tagline,
        city: listing.location_id,
        price_tokens: listing.price_tokens,
        imageUrl: "/placeholder.svg",
        is_highlighted: listing.is_highlighted,
        is_special: listing.is_special,
        available_now_active: listing.available_now_active,
        tier: "free" as const,
        is_verified: false,
      }));
    },
  });

  const handleListingClick = (id: string) => {
    navigate(`/listing/${id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        isAuthenticated={!!session}
        loveCoins={profile?.love_coin_balance || 0}
        onCategorySelect={setSelectedCategory}
        onLocationSelect={setSelectedLocation}
        selectedCategory={selectedCategory}
        selectedLocation={selectedLocation}
      />

      {/* Hero Section */}
      <section className="border-b border-border bg-gradient-to-b from-background to-card/50">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Love Directory
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover and connect with verified professionals. Browse listings, explore categories, and find what you're looking for.
            </p>

            {/* Search Bar */}
            <div className="flex gap-2 max-w-xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search listings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button size="lg">Search</Button>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{listings.length}+</div>
                <div className="text-sm text-muted-foreground">Active Listings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Available Support</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">Secure Platform</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured/Available Now Section */}
      {listings.some((l) => l.available_now_active) && (
        <section className="border-b border-border bg-card/30">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="h-5 w-5 text-available" />
              <h2 className="text-2xl font-bold">Available Now</h2>
              <Badge variant="outline" className="ml-2">Live</Badge>
            </div>
            <ListingGrid
              listings={listings.filter((l) => l.available_now_active)}
              onListingClick={handleListingClick}
            />
          </div>
        </section>
      )}

      {/* Main Listings Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">Browse Listings</h2>
            </div>
            {!session && (
              <Button variant="outline" onClick={() => navigate("/auth")}>
                Join Now
              </Button>
            )}
          </div>

          {listings.length > 0 ? (
            <ListingGrid listings={listings} onListingClick={handleListingClick} />
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No listings found. Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="border-t border-border bg-card/50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join thousands of professionals already using Love Directory to grow their business.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={() => navigate("/auth?mode=signup")}>
              Create Free Account
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/pricing")}>
              View Pricing
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;

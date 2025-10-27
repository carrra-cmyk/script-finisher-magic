import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { ListingGrid } from "@/components/ListingGrid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, TrendingUp, Sparkles } from "lucide-react";
import { Session } from "@supabase/supabase-js";

// Demo data for initial display
const DEMO_LISTINGS = [
  {
    id: "1",
    title: "Luxury Companion - Downtown",
    tagline: "Elite experience in the heart of the city",
    city: "New York",
    price_tokens: 150,
    imageUrl: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=533&fit=crop",
    is_highlighted: true,
    tier: "elite" as const,
    is_verified: true,
    available_now_active: true,
  },
  {
    id: "2",
    title: "Sensual Massage Therapy",
    tagline: "Professional relaxation services",
    city: "Los Angeles",
    price_tokens: 80,
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=533&fit=crop",
    tier: "vip" as const,
    is_verified: true,
  },
  {
    id: "3",
    title: "BDSM Mistress",
    tagline: "Experienced dominatrix",
    city: "Miami",
    price_tokens: 200,
    imageUrl: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=533&fit=crop",
    is_special: true,
    tier: "elite" as const,
  },
  {
    id: "4",
    title: "Content Creator",
    tagline: "Custom videos & photoshoots",
    city: "Las Vegas",
    price_tokens: 50,
    imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=533&fit=crop",
    tier: "basic" as const,
  },
  {
    id: "5",
    title: "Elegant Escort Service",
    tagline: "Sophisticated companionship",
    city: "Chicago",
    price_tokens: 120,
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=533&fit=crop",
    tier: "vip" as const,
    available_now_active: true,
  },
  {
    id: "6",
    title: "Tantric Massage",
    tagline: "Ancient art of pleasure",
    city: "San Francisco",
    price_tokens: 90,
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=533&fit=crop",
    tier: "basic" as const,
    is_verified: true,
  },
  {
    id: "7",
    title: "Private Dancer",
    tagline: "Exclusive entertainment",
    city: "Miami",
    price_tokens: 100,
    imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=533&fit=crop",
    tier: "vip" as const,
  },
  {
    id: "8",
    title: "Professional Companion",
    tagline: "Dinner dates & events",
    city: "Boston",
    price_tokens: 110,
    imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=533&fit=crop",
    tier: "basic" as const,
  },
  {
    id: "9",
    title: "Fetish Model",
    tagline: "Alternative lifestyle specialist",
    city: "Seattle",
    price_tokens: 85,
    imageUrl: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=533&fit=crop",
    is_special: true,
    tier: "vip" as const,
  },
  {
    id: "10",
    title: "Elite Travel Companion",
    tagline: "Worldwide availability",
    city: "New York",
    price_tokens: 300,
    imageUrl: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=533&fit=crop",
    tier: "elite" as const,
    is_verified: true,
    is_highlighted: true,
  },
];

const CATEGORIES = [
  { name: "Escorts", count: 1243, icon: "💋" },
  { name: "Massage", count: 567, icon: "💆" },
  { name: "BDSM & Fetish", count: 432, icon: "⛓️" },
  { name: "Content Creators", count: 891, icon: "📸" },
];

export default function Index() {
  const [session, setSession] = useState<Session | null>(null);
  const [loveCoins, setLoveCoins] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        fetchUserProfile(session.user.id);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        setTimeout(() => {
          fetchUserProfile(session.user.id);
        }, 0);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    const { data } = await supabase
      .from("profiles")
      .select("love_coin_balance")
      .eq("id", userId)
      .single();

    if (data) {
      setLoveCoins(data.love_coin_balance);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        isAuthenticated={!!session}
        loveCoins={loveCoins}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Discover Premium
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {" "}Adult Services
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              The most sophisticated adult classifieds directory with verified models and secure transactions
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by location, category, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-base bg-card border-border"
                />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-sm">
                <Badge variant="outline" className="bg-card">
                  <TrendingUp className="h-3.5 w-3.5 mr-1" />
                  5,000+ Active Listings
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Badge variant="outline" className="bg-card">
                  <Sparkles className="h-3.5 w-3.5 mr-1" />
                  Verified Models
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 px-4 bg-card/50">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-8">Browse Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CATEGORIES.map((category) => (
              <button
                key={category.name}
                className="p-6 rounded-xl border border-border bg-card hover:bg-card/80 transition-all hover:scale-105 text-left group"
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h3 className="font-semibold mb-1">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count} listings</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Available Now Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-highlight/20 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-highlight" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Available Now</h2>
                <p className="text-sm text-muted-foreground">Ready to meet immediately</p>
              </div>
            </div>
            <Button variant="ghost">View All</Button>
          </div>
          <ListingGrid
            listings={DEMO_LISTINGS.filter((l) => l.available_now_active)}
            onListingClick={(id) => navigate(`/listing/${id}`)}
          />
        </div>
      </section>

      {/* Featured Listings Section */}
      <section className="py-16 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">Featured Listings</h2>
              <p className="text-sm text-muted-foreground">Premium verified models</p>
            </div>
            <Button variant="ghost">View All</Button>
          </div>
          <ListingGrid
            listings={DEMO_LISTINGS}
            onListingClick={(id) => navigate(`/listing/${id}`)}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center space-y-6 p-12 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of models earning with Love Directory
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Button size="lg" asChild>
                <a href="/auth?mode=signup">Create Your Listing</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/about">Learn More</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4 bg-card/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">About</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">GDPR Compliance</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Safety Guidelines</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Guidelines</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Report Content</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Love Directory. All rights reserved. Adults only (18+)</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
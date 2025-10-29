import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Heart, Plus, Edit, Trash2, Eye, TrendingUp, Coins } from "lucide-react";
import type { User, Session } from "@supabase/supabase-js";

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();

  // Fetch user profile
  const { data: profile } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  // Fetch user's listings
  const { data: listings = [], refetch: refetchListings } = useQuery({
    queryKey: ["user-listings", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data, error } = await supabase
        .from("listings")
        .select(`
          *,
          categories(name),
          locations(city, state),
          media(url, type)
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (!session) {
          navigate("/auth");
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleDeleteListing = async (listingId: string) => {
    if (!confirm("Are you sure you want to delete this listing?")) return;

    try {
      const { error } = await supabase
        .from("listings")
        .delete()
        .eq("id", listingId);

      if (error) throw error;

      toast.success("Listing deleted successfully");
      refetchListings();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete listing");
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success("Signed out successfully");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message || "Failed to sign out");
    }
  };

  if (!user) {
    return null;
  }

  const activeListings = listings.filter((l) => l.is_active);
  const inactiveListings = listings.filter((l) => !l.is_active);

  return (
    <div className="min-h-screen bg-background">
      <Header
        isAuthenticated={true}
        loveCoins={profile?.love_coin_balance || 0}
        onMenuClick={() => {}}
      />

      <main className="container mx-auto px-4 py-8 pt-24">
        {/* Profile Summary */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">Welcome back, {profile?.display_name || "User"}!</CardTitle>
                  <CardDescription className="mt-2">
                    Manage your listings and account settings
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => navigate("/post-listing")}>
                    <Plus className="mr-2 h-4 w-4" />
                    New Listing
                  </Button>
                  <Button variant="outline" onClick={handleSignOut}>
                    Sign Out
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Active Listings</p>
                    <p className="text-2xl font-bold">{activeListings.length}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Coins className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Love Coins</p>
                    <p className="text-2xl font-bold">{profile?.love_coin_balance || 0}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Heart className="h-6 w-6 text-primary fill-current" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Account Tier</p>
                    <p className="text-2xl font-bold capitalize">{profile?.tier || "Free"}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Listings Tabs */}
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="active">
              Active Listings ({activeListings.length})
            </TabsTrigger>
            <TabsTrigger value="inactive">
              Inactive Listings ({inactiveListings.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {activeListings.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground mb-4">You don't have any active listings yet.</p>
                  <Button onClick={() => navigate("/post-listing")}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Listing
                  </Button>
                </CardContent>
              </Card>
            ) : (
              activeListings.map((listing: any) => (
                <Card key={listing.id}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      {listing.media?.[0] && (
                        <img
                          src={listing.media[0].url}
                          alt={listing.title}
                          className="w-32 h-32 object-cover rounded-lg"
                        />
                      )}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-xl font-semibold">{listing.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {listing.categories?.name} • {listing.locations?.city}, {listing.locations?.state}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            {listing.is_highlighted && <Badge variant="secondary">Highlighted</Badge>}
                            {listing.is_special && <Badge variant="secondary">Special</Badge>}
                            {listing.available_now_active && <Badge variant="default">Available Now</Badge>}
                          </div>
                        </div>
                        <p className="text-sm mb-4 line-clamp-2">{listing.tagline}</p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => navigate(`/listing/${listing.id}`)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => navigate(`/edit-listing/${listing.id}`)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDeleteListing(listing.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="inactive" className="space-y-4">
            {inactiveListings.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No inactive listings.</p>
                </CardContent>
              </Card>
            ) : (
              inactiveListings.map((listing: any) => (
                <Card key={listing.id}>
                  <CardContent className="p-6 opacity-60">
                    <div className="flex gap-4">
                      {listing.media?.[0] && (
                        <img
                          src={listing.media[0].url}
                          alt={listing.title}
                          className="w-32 h-32 object-cover rounded-lg"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold">{listing.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {listing.categories?.name} • {listing.locations?.city}, {listing.locations?.state}
                        </p>
                        <Badge variant="secondary" className="mt-2">Inactive</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

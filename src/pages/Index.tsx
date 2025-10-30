import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import type { Session } from "@supabase/supabase-js";

export default function Index() {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

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

  return (
    <div className="min-h-screen bg-background">
      <Header
        isAuthenticated={!!session}
        loveCoins={profile?.love_coin_balance || 0}
      />
      
      <section className="border-b border-border bg-gradient-to-b from-background to-card/50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-5xl font-bold">
              Welcome to <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Love Directory</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Discover and connect with verified professionals. Browse listings and find what you're looking for.
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Button size="lg" onClick={() => navigate("/auth?mode=signup")}>Get Started</Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/pricing")}>View Pricing</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

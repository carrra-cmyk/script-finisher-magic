import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Heart className="h-6 w-6 text-primary-foreground fill-current" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Love Directory
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/auth")}>Sign In</Button>
            <Button size="sm" onClick={() => navigate("/auth?mode=signup")}>Get Started</Button>
          </div>
        </div>
      </header>
      
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

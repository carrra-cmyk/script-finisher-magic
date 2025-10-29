import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Pricing() {
  const navigate = useNavigate();

  const tiers = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for getting started",
      features: [
        "Up to 2 listings",
        "8 photos per listing",
        "1 video (YouTube embed only)",
        "Available Now every 6 hours (active for 4 hours)",
        "Bump to top every 4 hours",
      ],
    },
    {
      name: "Basic",
      price: "$10",
      period: "/month",
      badge: "Basic Badge",
      description: "Great for regular advertisers",
      features: [
        "Up to 3 listings (max 2 per city category)",
        "16 photos per listing",
        "2 video uploads",
        "Available Now anytime",
        "Bump listings every 2 hours",
        "Appears in paid listing filters",
      ],
    },
    {
      name: "VIP",
      price: "$20",
      period: "/month",
      badge: "VIP Badge",
      description: "Enhanced visibility and features",
      features: [
        "Up to 4 listings",
        "32 photos per listing",
        "4 video uploads",
        "Available Now anytime",
        "Bump listings every hour",
        "VIP badge in premium filters",
        "10% discount on upgrades",
      ],
      popular: true,
    },
    {
      name: "Elite",
      price: "$30",
      period: "/month",
      badge: "Elite Badge",
      description: "Maximum exposure and benefits",
      features: [
        "Up to 5 listings",
        "40 photos per listing",
        "8 video uploads",
        "Available Now anytime",
        "Bump listings every 30 minutes",
        "Elite badge in premium filters",
        "15% discount on upgrades",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Membership Tiers</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that works best for you. All memberships designed for professional creators and advertisers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier) => (
            <Card key={tier.name} className={tier.popular ? "border-primary shadow-lg" : ""}>
              {tier.popular && (
                <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-semibold rounded-t-lg">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle>{tier.name}</CardTitle>
                  {tier.badge && <Badge variant="secondary">{tier.badge}</Badge>}
                </div>
                <CardDescription>{tier.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  {tier.period && <span className="text-muted-foreground">{tier.period}</span>}
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full" 
                  variant={tier.popular ? "default" : "outline"}
                  onClick={() => navigate("/auth")}
                >
                  {tier.name === "Free" ? "Get Started" : "Upgrade Now"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>All memberships are designed for professional creators, companions, and advertisers.</p>
          <p className="mt-2">Users are responsible for ensuring compliance with all applicable laws in their jurisdiction.</p>
        </div>
      </div>
    </div>
  );
}

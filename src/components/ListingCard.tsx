import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Heart, MapPin, Sparkles, Star, Verified } from "lucide-react";

interface ListingCardProps {
  id: string;
  title: string;
  tagline?: string;
  city?: string;
  priceTokens?: number;
  imageUrl: string;
  isHighlighted?: boolean;
  isSpecial?: boolean;
  availableNow?: boolean;
  tier?: "free" | "basic" | "vip" | "elite";
  isVerified?: boolean;
  onClick?: () => void;
}

export function ListingCard({
  title,
  tagline,
  city,
  priceTokens,
  imageUrl,
  isHighlighted,
  isSpecial,
  availableNow,
  tier,
  isVerified,
  onClick,
}: ListingCardProps) {
  return (
    <Card
      className="group relative overflow-hidden bg-card border-border cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
      onClick={onClick}
    >
      {/* Image with 3:4 aspect ratio */}
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-all duration-300 group-hover:brightness-105"
          loading="lazy"
        />
        
        {/* Subtle gradient overlay */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Compact top badges */}
        <div className="absolute top-2 left-2 flex gap-1">
          {availableNow && (
            <Badge className="bg-highlight/90 text-highlight-foreground backdrop-blur-sm border-0 text-xs px-2 py-0.5">
              <Sparkles className="h-3 w-3" />
            </Badge>
          )}
          {isVerified && (
            <Badge className="bg-verified/90 text-white backdrop-blur-sm border-0 text-xs px-2 py-0.5">
              <Verified className="h-3 w-3" />
            </Badge>
          )}
        </div>

        {/* Tier badge - top right */}
        {(tier === "vip" || tier === "elite") && (
          <div className="absolute top-2 right-2">
            <Badge className={tier === "elite" ? "bg-elite/90 text-black backdrop-blur-sm border-0 text-xs px-2 py-0.5" : "bg-vip/90 text-white backdrop-blur-sm border-0 text-xs px-2 py-0.5"}>
              <Star className="h-3 w-3" />
            </Badge>
          </div>
        )}

        {/* Simplified content overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 text-white">
          <h3 className="font-semibold text-base line-clamp-1 mb-1">{title}</h3>
          {city && (
            <div className="flex items-center gap-1 text-xs text-gray-200 mb-1">
              <MapPin className="h-3 w-3" />
              <span>{city}</span>
            </div>
          )}
          {priceTokens && (
            <div className="inline-flex items-center text-xs font-medium bg-primary/20 backdrop-blur-sm px-2 py-0.5 rounded-full">
              {priceTokens} LC
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
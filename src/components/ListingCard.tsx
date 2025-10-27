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
      className="group relative overflow-hidden bg-card border-border cursor-pointer card-hover"
      onClick={onClick}
    >
      {/* Image with 3:4 aspect ratio */}
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-all duration-300 group-hover:brightness-110 image-fade-in"
          loading="lazy"
        />
        
        {/* Gradient overlay at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        
        {/* Corner badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1.5">
          {availableNow && (
            <Badge className="bg-highlight/90 text-highlight-foreground backdrop-blur-sm border-0 text-xs font-medium px-2 py-0.5">
              <Sparkles className="h-3 w-3 mr-1" />
              Available Now
            </Badge>
          )}
          {tier === "vip" && (
            <Badge className="bg-vip/90 text-white backdrop-blur-sm border-0 text-xs font-medium px-2 py-0.5">
              <Star className="h-3 w-3 mr-1" />
              VIP
            </Badge>
          )}
          {tier === "elite" && (
            <Badge className="bg-elite/90 text-black backdrop-blur-sm border-0 text-xs font-medium px-2 py-0.5">
              <Star className="h-3 w-3 mr-1 fill-current" />
              Elite
            </Badge>
          )}
          {isSpecial && (
            <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm border-0 text-xs font-medium px-2 py-0.5">
              Specials
            </Badge>
          )}
        </div>

        {/* Verification badge */}
        {isVerified && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-verified/90 text-white backdrop-blur-sm border-0 text-xs font-medium px-2 py-0.5">
              <Verified className="h-3 w-3" />
            </Badge>
          </div>
        )}

        {/* Content overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 text-white">
          <h3 className="font-semibold text-lg line-clamp-2 mb-1">{title}</h3>
          {tagline && (
            <p className="text-sm text-gray-300 line-clamp-1 mb-2">{tagline}</p>
          )}
          <div className="flex items-center justify-between">
            {city && (
              <div className="flex items-center gap-1 text-sm text-gray-300">
                <MapPin className="h-3.5 w-3.5" />
                <span>{city}</span>
              </div>
            )}
            {priceTokens && (
              <div className="flex items-center gap-1 text-sm font-medium bg-primary/20 backdrop-blur-sm px-2 py-0.5 rounded-full">
                <span>{priceTokens} LC</span>
              </div>
            )}
          </div>
        </div>

        {/* Favorite button */}
        <button
          className="absolute top-2 right-2 p-2 rounded-full bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Heart className="h-4 w-4 text-white" />
        </button>
      </div>
    </Card>
  );
}
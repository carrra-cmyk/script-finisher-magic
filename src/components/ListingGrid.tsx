import { ListingCard } from "@/components/ListingCard";

interface Listing {
  id: string;
  title: string;
  tagline?: string;
  city?: string;
  price_tokens?: number;
  imageUrl: string;
  is_highlighted?: boolean;
  is_special?: boolean;
  available_now_active?: boolean;
  tier?: "free" | "basic" | "vip" | "elite";
  is_verified?: boolean;
}

interface ListingGridProps {
  listings: Listing[];
  onListingClick?: (id: string) => void;
}

export function ListingGrid({ listings, onListingClick }: ListingGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
      {listings.map((listing) => (
        <ListingCard
          key={listing.id}
          id={listing.id}
          title={listing.title}
          tagline={listing.tagline}
          city={listing.city}
          priceTokens={listing.price_tokens}
          imageUrl={listing.imageUrl}
          isHighlighted={listing.is_highlighted}
          isSpecial={listing.is_special}
          availableNow={listing.available_now_active}
          tier={listing.tier}
          isVerified={listing.is_verified}
          onClick={() => onListingClick?.(listing.id)}
        />
      ))}
    </div>
  );
}
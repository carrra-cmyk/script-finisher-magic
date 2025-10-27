-- Create user roles enum
CREATE TYPE public.user_role AS ENUM ('model', 'classified_user', 'admin', 'moderator');

-- Create tier enum
CREATE TYPE public.tier_name AS ENUM ('free', 'basic', 'vip', 'elite');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  display_name TEXT,
  love_coin_balance INTEGER DEFAULT 0 NOT NULL,
  tier tier_name DEFAULT 'free' NOT NULL,
  tier_expires_at TIMESTAMPTZ,
  is_yoti_verified BOOLEAN DEFAULT FALSE,
  yoti_activity_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create tiers reference table
CREATE TABLE public.tiers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name tier_name UNIQUE NOT NULL,
  max_ads INTEGER NOT NULL,
  max_images INTEGER NOT NULL,
  max_videos INTEGER NOT NULL,
  available_now_cooldown_hours INTEGER NOT NULL,
  bump_cooldown_minutes INTEGER NOT NULL,
  upgrade_discount_percent INTEGER DEFAULT 0,
  price_love_coins INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Insert tier defaults
INSERT INTO public.tiers (name, max_ads, max_images, max_videos, available_now_cooldown_hours, bump_cooldown_minutes, upgrade_discount_percent, price_love_coins) VALUES
('free', 2, 8, 1, 6, 240, 0, 0),
('basic', 3, 16, 2, 0, 120, 0, 20),
('vip', 4, 32, 4, 0, 60, 10, 50),
('elite', 5, 40, 8, 0, 30, 15, 100);

-- Create categories table
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  parent_id UUID REFERENCES public.categories(id) ON DELETE CASCADE,
  is_model_category BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Insert default categories
INSERT INTO public.categories (name, slug, is_model_category, display_order) VALUES
('Escorts', 'escorts', TRUE, 1),
('BDSM & Fetish', 'bdsm-fetish', TRUE, 2),
('Massage', 'massage', TRUE, 3),
('Content Creators', 'content-creators', TRUE, 4),
('Romantic', 'romantic', FALSE, 5),
('Swingers', 'swingers', FALSE, 6),
('Non-romantic', 'non-romantic', FALSE, 7);

-- Create locations table
CREATE TABLE public.locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  country TEXT NOT NULL,
  state TEXT,
  city TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create listings table
CREATE TABLE public.listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  tagline TEXT,
  description TEXT,
  category_id UUID NOT NULL REFERENCES public.categories(id),
  location_id UUID REFERENCES public.locations(id),
  price_tokens INTEGER,
  is_highlighted BOOLEAN DEFAULT FALSE,
  highlight_expires_at TIMESTAMPTZ,
  is_special BOOLEAN DEFAULT FALSE,
  has_slideshow BOOLEAN DEFAULT FALSE,
  is_paid_listing BOOLEAN DEFAULT FALSE,
  available_now_active BOOLEAN DEFAULT FALSE,
  available_now_ends_at TIMESTAMPTZ,
  last_bumped_at TIMESTAMPTZ DEFAULT NOW(),
  bump_next_available_at TIMESTAMPTZ DEFAULT NOW(),
  bump_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create media table
CREATE TABLE public.media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('image', 'video')),
  hash TEXT,
  display_order INTEGER DEFAULT 0,
  is_compressed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create upgrades table
CREATE TABLE public.upgrades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  cost_love_coins INTEGER NOT NULL,
  duration_hours INTEGER,
  max_active INTEGER,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Insert default upgrades
INSERT INTO public.upgrades (name, type, cost_love_coins, duration_hours, description) VALUES
('Highlight Listing', 'highlight', 10, 24, 'Make your listing stand out with a colored background'),
('Specials Tag', 'specials', 5, 72, 'Add a limited-time specials badge to your listing'),
('Image Slideshow', 'slideshow', 15, NULL, 'Show rotating images instead of a static thumbnail'),
('Paid Listing', 'paid', 8, 720, 'Appear in the Paid Listings filter'),
('Bump Anytime', 'bump', 3, NULL, 'Instantly bump your listing bypassing cooldown'),
('Homepage Feature', 'homepage', 50, 168, 'Feature your listing on the homepage');

-- Create listing_upgrades table
CREATE TABLE public.listing_upgrades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  upgrade_id UUID NOT NULL REFERENCES public.upgrades(id),
  purchased_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  expires_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE
);

-- Create love_coin_transactions table
CREATE TABLE public.love_coin_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('purchase', 'spend', 'refund')),
  amount INTEGER NOT NULL,
  description TEXT,
  related_listing_id UUID REFERENCES public.listings(id),
  invoice_id TEXT,
  status TEXT DEFAULT 'completed',
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create flagged_content table
CREATE TABLE public.flagged_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  reported_by UUID REFERENCES public.profiles(id),
  reason TEXT NOT NULL,
  details TEXT,
  reviewed_by UUID REFERENCES public.profiles(id),
  reviewed_at TIMESTAMPTZ,
  action_taken TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create user_roles table for admin/moderator access
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role user_role NOT NULL,
  UNIQUE(user_id, role)
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.upgrades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listing_upgrades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.love_coin_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flagged_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for tiers (public read)
CREATE POLICY "Tiers are viewable by everyone" ON public.tiers FOR SELECT USING (TRUE);

-- RLS Policies for categories (public read)
CREATE POLICY "Categories are viewable by everyone" ON public.categories FOR SELECT USING (TRUE);

-- RLS Policies for locations (public read)
CREATE POLICY "Locations are viewable by everyone" ON public.locations FOR SELECT USING (TRUE);

-- RLS Policies for listings
CREATE POLICY "Listings are viewable by everyone" ON public.listings FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Users can insert own listings" ON public.listings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own listings" ON public.listings FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own listings" ON public.listings FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for media
CREATE POLICY "Media is viewable by everyone" ON public.media FOR SELECT USING (TRUE);
CREATE POLICY "Users can insert media for own listings" ON public.media FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.listings WHERE id = listing_id AND user_id = auth.uid())
);
CREATE POLICY "Users can delete media for own listings" ON public.media FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.listings WHERE id = listing_id AND user_id = auth.uid())
);

-- RLS Policies for upgrades (public read)
CREATE POLICY "Upgrades are viewable by everyone" ON public.upgrades FOR SELECT USING (TRUE);

-- RLS Policies for listing_upgrades
CREATE POLICY "Users can view upgrades for own listings" ON public.listing_upgrades FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.listings WHERE id = listing_id AND user_id = auth.uid())
);

-- RLS Policies for love_coin_transactions
CREATE POLICY "Users can view own transactions" ON public.love_coin_transactions FOR SELECT USING (auth.uid() = user_id);

-- RLS Policies for flagged_content
CREATE POLICY "Anyone can report content" ON public.flagged_content FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Users can view reports on own listings" ON public.flagged_content FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.listings WHERE id = listing_id AND user_id = auth.uid())
);

-- RLS Policies for user_roles
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);

-- Function to check if user has a specific role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role user_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Trigger to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, username, display_name)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'username',
    NEW.raw_user_meta_data->>'display_name'
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_listings_updated_at
  BEFORE UPDATE ON public.listings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

import Header from "@/components/Header";
import ListingGrid from "@/components/ListingGrid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CategoryDropdown } from "@/components/CategoryDropdown";
import { LocationDropdown } from "@/components/LocationDropdown";
import { Search, TrendingUp, Sparkles } from "lucide-react";
import { Session } from "@supabase/supabase-js";

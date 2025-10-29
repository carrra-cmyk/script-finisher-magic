import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";

export default function FlaggedContent() {
  const navigate = useNavigate();
  const [flaggedItems, setFlaggedItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAdminAndLoadFlags();
  }, []);

  const checkAdminAndLoadFlags = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      navigate("/auth");
      return;
    }

    const { data: hasAdminRole } = await supabase
      .rpc('has_role', { _user_id: user.id, _role: 'admin' });

    if (!hasAdminRole) {
      navigate("/");
      return;
    }

    loadFlags();
  };

  const loadFlags = async () => {
    const { data, error } = await supabase
      .from("flagged_content")
      .select(`
        *,
        listings(title, slug)
      `)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setFlaggedItems(data);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" onClick={() => navigate("/admin")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Flagged Content Review</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div>Loading flagged content...</div>
            ) : flaggedItems.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No flagged content to review
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Listing</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Reported</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {flaggedItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        {item.listings?.title || "—"}
                      </TableCell>
                      <TableCell>{item.reason}</TableCell>
                      <TableCell className="max-w-xs truncate">{item.details || "—"}</TableCell>
                      <TableCell>
                        {new Date(item.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {item.reviewed_at ? (
                          <Badge variant="default">Reviewed</Badge>
                        ) : (
                          <Badge variant="destructive">Pending</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">Review</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

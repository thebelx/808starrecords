import type { ContentStatus } from "@/types";
import { Badge } from "@/components/ui/badge";

interface ContentBadgeProps {
  status: ContentStatus;
  className?: string;
}

export function ContentBadge({ status, className }: ContentBadgeProps) {
  return (
    <Badge
      variant={status === "verified" ? "verified" : "placeholder"}
      className={className}
    >
      {status === "verified" ? "Verified" : "Placeholder"}
    </Badge>
  );
}

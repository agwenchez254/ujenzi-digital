import { Skeleton } from "@/components/ui/skeleton";

function ContactListSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="rounded-lg border border-border bg-background p-4"
        >
          <Skeleton className="h-4 w-1/3" />
          <div className="mt-3 space-y-2">
            <Skeleton className="h-3 w-2/3" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}
export default ContactListSkeleton;
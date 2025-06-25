import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-50 to-slate-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center">
            <Skeleton className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-7 w-32 mx-auto" />
            <Skeleton className="h-4 w-48 mx-auto" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <div className="relative">
                <Skeleton className="h-10 w-full" />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Skeleton className="h-4 w-4" />
                </div>
              </div>
            </div>

            <Skeleton className="h-10 w-full" />
          </div>

          <div className="mt-6 text-center">
            <Skeleton className="h-4 w-40 mx-auto" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

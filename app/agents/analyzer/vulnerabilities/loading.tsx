import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function VulnerabilitiesLoading() {
  return (
    <div>
      <div className="mb-8">
        <Skeleton className="h-10 w-64 mb-6" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="bg-gray-900 border-gray-800">
            <CardHeader>
              <div className="flex justify-between">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-6 w-24" />
              </div>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-6" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Skeleton className="h-6 w-40 mb-3" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6 mt-2" />
                </div>
                <div>
                  <Skeleton className="h-6 w-40 mb-3" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <div className="flex gap-2">
                      <Skeleton className="h-8 w-28" />
                      <Skeleton className="h-8 w-28" />
                    </div>
                  </div>
                </div>
              </div>

              <Skeleton className="h-6 w-40 mt-6 mb-3" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>

              <div className="flex justify-end mt-6 gap-2">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-10 w-32" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function SettingsLoading() {
  return (
    <div>
      <div className="mb-6">
        <Skeleton className="h-8 w-64 mb-2" />
        <Skeleton className="h-4 w-96" />
      </div>

      <div className="space-y-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="bg-gray-900 border-gray-800">
            <CardHeader>
              <Skeleton className="h-6 w-48 mb-1" />
              <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <Skeleton className="h-5 w-40 mb-1" />
                  <Skeleton className="h-4 w-64" />
                </div>
                <Skeleton className="h-6 w-12" />
              </div>

              {i === 3 && (
                <div className="mt-4 space-y-4">
                  <div>
                    <Skeleton className="h-5 w-32 mb-2" />
                    <div className="flex gap-2">
                      <Skeleton className="h-10 flex-grow" />
                      <Skeleton className="h-10 w-10" />
                    </div>
                  </div>

                  <div>
                    <Skeleton className="h-5 w-32 mb-2" />
                    <div className="flex gap-2">
                      <Skeleton className="h-10 flex-grow" />
                      <Skeleton className="h-10 w-10" />
                    </div>
                  </div>
                </div>
              )}

              {i === 4 && (
                <div>
                  <Skeleton className="h-5 w-40 mb-2" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-4 w-3/4 mt-1" />
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        <div className="flex justify-end mt-2">
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  )
}

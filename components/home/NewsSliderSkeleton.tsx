import { Card, CardContent } from "../ui/card";

export default function NewsSliderSkeleton() {
    return (
      <section className="py-20 bg-gradient-hero">
        <div className="container">
          <div className="text-center mb-12">
            <div className="h-10 w-48 bg-muted animate-pulse rounded mx-auto mb-4" />
            <div className="h-6 w-96 bg-muted animate-pulse rounded mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="aspect-video bg-muted animate-pulse" />
                <CardContent className="p-6 space-y-3">
                  <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                  <div className="h-6 w-full bg-muted animate-pulse rounded" />
                  <div className="h-4 w-full bg-muted animate-pulse rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }
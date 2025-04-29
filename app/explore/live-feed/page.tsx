import { PageLayoutWithBreadcrumbs } from "@/components/page-layout-with-breadcrumbs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Rss, AlertCircle, Clock, Shield } from "lucide-react"

// Define the live feed items outside the component
const liveFeedItems = [
  {
    title: "Critical Vulnerability Detected",
    description: "Potential reentrancy vulnerability detected in contract 0x1234...5678 on Ethereum Mainnet.",
    time: "2 minutes ago",
    type: "security" as const,
    severity: "high" as const,
  },
  {
    title: "Large Transaction Alert",
    description: "Unusual transaction of 500 ETH from known exchange wallet to unverified contract.",
    time: "15 minutes ago",
    type: "transaction" as const,
  },
  {
    title: "New Contract Deployment",
    description: "New DeFi protocol contract deployed on Arbitrum by verified developer team.",
    time: "32 minutes ago",
    type: "deployment" as const,
  },
  {
    title: "Flash Loan Activity",
    description: "Multiple flash loans detected on Aave protocol with large volume.",
    time: "45 minutes ago",
    type: "transaction" as const,
  },
  {
    title: "Access Control Issue",
    description: "Potential access control misconfiguration in newly deployed contract 0xabcd...efgh.",
    time: "1 hour ago",
    type: "security" as const,
    severity: "medium" as const,
  },
]

interface LiveFeedItemProps {
  item: {
    title: string
    description: string
    time: string
    type: "security" | "transaction" | "deployment"
    severity?: "high" | "medium" | "low"
  }
}

function LiveFeedItem({ item }: LiveFeedItemProps) {
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            {item.type === "security" && (
              <AlertCircle
                className={`h-5 w-5 mr-2 ${
                  item.severity === "high"
                    ? "text-red-500"
                    : item.severity === "medium"
                      ? "text-yellow-500"
                      : "text-blue-500"
                }`}
              />
            )}
            {item.type === "transaction" && <Rss className="h-5 w-5 mr-2 text-blue-500" />}
            {item.type === "deployment" && <Shield className="h-5 w-5 mr-2 text-purple-500" />}
            <CardTitle className="text-lg">{item.title}</CardTitle>
          </div>
          <div className="text-xs text-gray-500">{item.time}</div>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>{item.description}</CardDescription>
      </CardContent>
    </Card>
  )
}

export default function LiveFeedPage() {
  return (
    <PageLayoutWithBreadcrumbs>
      <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Live Feed</h1>
            <p className="text-gray-400 mt-2">Real-time updates on security events and blockchain activities</p>
          </div>
          <Badge variant="outline" className="mt-2 md:mt-0 bg-emerald-900/20 text-emerald-400 border-emerald-800">
            <Clock className="h-3 w-3 mr-1" />
            Live Updates
          </Badge>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="bg-gray-900 border-gray-800">
            <TabsTrigger value="all">All Events</TabsTrigger>
            <TabsTrigger value="security">Security Alerts</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="deployments">Contract Deployments</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <div className="space-y-4 mt-4">
              {liveFeedItems.map((item, index) => (
                <LiveFeedItem key={index} item={item} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="security">
            <div className="space-y-4 mt-4">
              {liveFeedItems
                .filter((item) => item.type === "security")
                .map((item, index) => (
                  <LiveFeedItem key={index} item={item} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="transactions">
            <div className="space-y-4 mt-4">
              {liveFeedItems
                .filter((item) => item.type === "transaction")
                .map((item, index) => (
                  <LiveFeedItem key={index} item={item} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="deployments">
            <div className="space-y-4 mt-4">
              {liveFeedItems
                .filter((item) => item.type === "deployment")
                .map((item, index) => (
                  <LiveFeedItem key={index} item={item} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayoutWithBreadcrumbs>
  )
}

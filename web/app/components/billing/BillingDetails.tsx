import { User } from "@/lib/types/user";
import { Loader2, TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useMeterUsage } from "@/hooks/use-meter-usage";
import { SubscriptionDialog } from "./subscibe-modal";

interface IBillingDetailsProps {
  user: User;
}

export function BillingDetails({ user }: IBillingDetailsProps) {
  const { isFetching, data: chartData } = useMeterUsage();
  const totalDocuments =
    chartData?.reduce((sum, day) => sum + day.documents, 0) || 0;
  const documentsToBeBilled = totalDocuments > 5 ? totalDocuments - 5 : 0;
  const estimatedBill = documentsToBeBilled * 1;
  const chartConfig = {
    documents: {
      label: "Documents Generated",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  if (isFetching) {
    return <Loader2 className="w-8 h-8 animate-spin" />;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Billing & Usage</h1>
        <p className="text-muted-foreground">
          Manage your subscription and track your document generation usage.
        </p>
      </div>

      <div className="space-y-6">
        {/* Subscription Dialog */}
        {!user.isPro && <SubscriptionDialog user={user} />}

        {/* Usage Card */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Usage</CardTitle>
            <CardDescription>Track your document generation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  Documents Generated
                </p>
                <p className="text-2xl font-bold">{totalDocuments}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  Documents to be Billed
                </p>
                <p className="text-2xl font-bold">{documentsToBeBilled}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Estimated Bill</p>
                <p className="text-2xl font-bold">
                  ${estimatedBill.toFixed(2)}
                  <br />
                  <small className="text-xs font-light text-muted-foreground">
                    Estimated charges shown. Your final bill may differ due to
                    applicable discounts and promotions.
                  </small>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Usage Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Usage</CardTitle>
            <CardDescription>Current Month</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <LineChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 24,
                  right: 24,
                  top: 24,
                  bottom: 24,
                }}
                height={400}
              >
                <CartesianGrid
                  horizontal={true}
                  vertical={false}
                  stroke="hsl(var(--border))"
                  strokeDasharray="8"
                />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={12}
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  allowDecimals={false}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={12}
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  allowDecimals={false}
                />
                <ChartTooltip
                  cursor={{ stroke: "hsl(var(--muted))" }}
                  content={<ChartTooltipContent />}
                />
                <Line
                  dataKey="documents"
                  type="monotone"
                  strokeWidth={2}
                  stroke="#2563eb"
                  dot={{
                    r: 4,
                    fill: "#2563eb",
                    strokeWidth: 0,
                  }}
                  activeDot={{
                    r: 6,
                    fill: "#2563eb",
                    strokeWidth: 0,
                  }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              {totalDocuments} documents generated this month{" "}
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing daily document generation for the ongoing month
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

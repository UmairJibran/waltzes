import { User } from "@/lib/types/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
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
import { useRouter } from "next/navigation";
import { useMeterUsage } from "@/hooks/use-meter-usage";

interface IBillingDetailsProps {
  user: User;
}

export function BillingDetails({ user }: IBillingDetailsProps) {
  const [couponCode, setCouponCode] = useState("");

  const router = useRouter();
  const subscribe = () => {
    const path = process.env.NEXT_PUBLIC_CHARGEBEE_LINK;
    if (!path) return;
    const url = new URL(path);
    url.searchParams.append("customer[first_name]", user.firstName);
    url.searchParams.append("customer[last_name]", user.lastName);
    url.searchParams.append("customer[email]", user.email);
    if (couponCode) {
      url.searchParams.append("coupon_ids[0]", couponCode);
    }
    router.push(url.toString());
  };

  const { isFetching, data: chartData } = useMeterUsage();
  const totalDocuments =
    chartData?.reduce((sum, day) => sum + day.documents, 0) || 0;
  const documentsToBeBilled = totalDocuments > 5 ? totalDocuments - 5 : 0;
  const estimatedBill = documentsToBeBilled * 0.25;
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
        {/* Subscription Card */}
        <Card hidden={user.isPro}>
          <CardHeader>
            <CardTitle>Pro Plan</CardTitle>
            <CardDescription>Pay-as-you-go document generation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">$0.25</span>
                <span className="text-muted-foreground">/document</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Pay only for what you use
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="coupon">Have a coupon code?</Label>
              <div className="flex gap-2">
                <Input
                  id="coupon"
                  placeholder="Enter code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <Button onClick={subscribe}>Subscribe</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Usage Card */}
        <Card hidden={!user.isPro}>
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
                    Discounts/Couponse not applied
                  </small>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Usage Chart */}
        <Card hidden={!user.isPro}>
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

import { User } from "@/lib/types/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

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

interface IBillingDetailsProps {
  user: User;
}

// Dummy data for demonstration
const dummyUsage = {
  documentsGenerated: 3,
  documentsToBeBilled: 0,
  estimatedBill: 0,
};

// Generate dummy data for the last 30 days
const generateDailyData = () => {
  const data = [];
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      documents: Math.floor(Math.random() * 5), // Random number of documents per day
    });
  }
  return data;
};

export function BillingDetails({ user }: IBillingDetailsProps) {
  const [couponCode, setCouponCode] = useState("");

  const handleSubscribe = () => {
    // Handle subscription logic here
    console.log("Subscribing with coupon:", couponCode);
  };

  const chartData = generateDailyData();
  const totalDocuments = chartData.reduce((sum, day) => sum + day.documents, 0);
  const estimatedBill = totalDocuments * 0.25;

  const chartConfig = {
    documents: {
      label: "Documents Generated",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

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
        <Card>
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
                <Button onClick={handleSubscribe}>Subscribe</Button>
              </div>
            </div>
          </CardContent>
        </Card>

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
                <p className="text-2xl font-bold">{totalDocuments}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Estimated Bill</p>
                <p className="text-2xl font-bold">
                  ${estimatedBill.toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Usage Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Usage</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <LineChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                  top: 12,
                  bottom: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
                <Line
                  dataKey="documents"
                  type="natural"
                  strokeWidth={2}
                  dot={true}
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
              Showing daily document generation for the last 30 days
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

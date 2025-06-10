import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area } from 'recharts';

const TransactionVolumeChart = ({ data }: { data: any[] }) => (
  <Card className="lg:col-span-2 h-full">
    <CardHeader className="p-4 lg:p-6">
      <CardTitle className="text-base lg:text-lg">Transaction Volume</CardTitle>
      <CardDescription className="text-xs lg:text-sm">Daily transaction count and revenue</CardDescription>
    </CardHeader>
    <CardContent className="p-4 lg:p-6 pt-0">
      <div className="h-64 lg:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="transactions"
              stroke="#3B82F6"
              fill="#3B82F6"
              fillOpacity={0.2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);

export default TransactionVolumeChart;
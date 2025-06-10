import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

const PaymentMethodsChart = ({ data }: { data: any[] }) => (
  <Card>
    <CardHeader className="p-4 lg:p-6">
      <CardTitle className="text-base lg:text-lg">Payment Methods</CardTitle>
      <CardDescription className="text-xs lg:text-sm">Distribution by volume</CardDescription>
    </CardHeader>
    <CardContent className="p-4 lg:p-6 pt-0">
      <div className="h-64 lg:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="space-y-2 mt-4">
        {data.map((item) => (
          <div key={item.name} className="flex items-center justify-between text-xs lg:text-sm">
            <div className="flex items-center">
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: item.color }}
              />
              {item.name}
            </div>
            <span className="font-medium">{item.value}%</span>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default PaymentMethodsChart;
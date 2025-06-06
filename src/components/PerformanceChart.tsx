
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { BarChart3, PieChart as PieChartIcon } from "lucide-react";

interface Student {
  id: string;
  name: string;
  averageGrade: number;
}

interface PerformanceChartProps {
  students: Student[];
}

const PerformanceChart = ({ students }: PerformanceChartProps) => {
  // Grade distribution data
  const gradeRanges = [
    { range: "90-100", count: 0, color: "#10b981" },
    { range: "80-89", count: 0, color: "#f59e0b" },
    { range: "70-79", count: 0, color: "#ef4444" },
    { range: "60-69", count: 0, color: "#8b5cf6" },
    { range: "0-59", count: 0, color: "#6b7280" },
  ];

  students.forEach((student) => {
    const grade = student.averageGrade;
    if (grade >= 90) gradeRanges[0].count++;
    else if (grade >= 80) gradeRanges[1].count++;
    else if (grade >= 70) gradeRanges[2].count++;
    else if (grade >= 60) gradeRanges[3].count++;
    else gradeRanges[4].count++;
  });

  // Top 10 students for bar chart
  const topStudents = students
    .slice(0, 10)
    .map((student) => ({
      name: student.name.split(" ")[0], // First name only for better display
      grade: student.averageGrade,
    }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <span>Top 10 Students</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topStudents}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                angle={-45}
                textAnchor="end"
                height={60}
                fontSize={12}
              />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`${value}%`, "Grade"]}
                labelStyle={{ color: "#333" }}
              />
              <Bar 
                dataKey="grade" 
                fill="url(#colorGradient)"
                radius={[4, 4, 0, 0]}
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.9}/>
                  <stop offset="95%" stopColor="#1e40af" stopOpacity={0.9}/>
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <PieChartIcon className="h-5 w-5 text-primary" />
            <span>Grade Distribution</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={gradeRanges}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="count"
              >
                {gradeRanges.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name, props) => [
                  `${value} students`, 
                  `${props.payload.range}%`
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {gradeRanges.map((range, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded"
                  style={{ backgroundColor: range.color }}
                />
                <span className="text-sm text-muted-foreground">
                  {range.range}% ({range.count})
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceChart;

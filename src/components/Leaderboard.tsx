
import { Trophy, Users, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StudentCard from "./StudentCard";

interface Student {
  id: string;
  name: string;
  email: string;
  totalScore: number;
  averageGrade: number;
  rank: number;
  previousRank: number;
  assignments: number;
  lastSubmission: string;
}

interface LeaderboardProps {
  students: Student[];
}

const Leaderboard = ({ students }: LeaderboardProps) => {
  const topPerformers = students.slice(0, 10);
  const classAverage = students.reduce((sum, student) => sum + student.averageGrade, 0) / students.length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8" />
              <div>
                <p className="text-sm opacity-90">Total Students</p>
                <p className="text-2xl font-bold">{students.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8" />
              <div>
                <p className="text-sm opacity-90">Class Average</p>
                <p className="text-2xl font-bold">{classAverage.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-500 to-amber-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Trophy className="h-8 w-8" />
              <div>
                <p className="text-sm opacity-90">Top Score</p>
                <p className="text-2xl font-bold">{students[0]?.averageGrade.toFixed(1) || 0}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-amber-500" />
            <span>Class Leaderboard</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {topPerformers.map((student) => (
              <StudentCard
                key={student.id}
                student={student}
                totalStudents={students.length}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Leaderboard;

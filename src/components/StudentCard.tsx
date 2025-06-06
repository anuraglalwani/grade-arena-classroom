
import { User, TrendingUp, TrendingDown, Medal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

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

interface StudentCardProps {
  student: Student;
  totalStudents: number;
}

const StudentCard = ({ student, totalStudents }: StudentCardProps) => {
  const getRankBadgeColor = (rank: number) => {
    if (rank <= 3) return "bg-gradient-to-r from-yellow-400 to-yellow-600";
    if (rank <= 10) return "bg-gradient-to-r from-emerald-400 to-emerald-600";
    return "bg-gradient-to-r from-slate-400 to-slate-600";
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Medal className="h-4 w-4 text-yellow-300" />;
    if (rank === 2) return <Medal className="h-4 w-4 text-gray-300" />;
    if (rank === 3) return <Medal className="h-4 w-4 text-amber-600" />;
    return null;
  };

  const rankChange = student.previousRank - student.rank;
  const progressPercentile = ((totalStudents - student.rank + 1) / totalStudents) * 100;

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-primary-foreground" />
              </div>
              {getRankIcon(student.rank) && (
                <div className="absolute -top-1 -right-1">
                  {getRankIcon(student.rank)}
                </div>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{student.name}</h3>
              <p className="text-sm text-muted-foreground">{student.email}</p>
            </div>
          </div>
          <div className="text-right">
            <Badge className={`${getRankBadgeColor(student.rank)} text-white border-0`}>
              #{student.rank}
            </Badge>
            {rankChange !== 0 && (
              <div className="flex items-center mt-1 text-xs">
                {rankChange > 0 ? (
                  <TrendingUp className="h-3 w-3 text-emerald-500 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                )}
                <span className={rankChange > 0 ? "text-emerald-500" : "text-red-500"}>
                  {Math.abs(rankChange)}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Performance</span>
              <span className="font-medium">{student.averageGrade.toFixed(1)}%</span>
            </div>
            <Progress value={student.averageGrade} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Total Score</p>
              <p className="font-semibold text-foreground">{student.totalScore}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Assignments</p>
              <p className="font-semibold text-foreground">{student.assignments}</p>
            </div>
          </div>

          <div className="pt-2 border-t">
            <p className="text-xs text-muted-foreground">
              Last submission: {student.lastSubmission}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Top {Math.round(progressPercentile)}% of class
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentCard;

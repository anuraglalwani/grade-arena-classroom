
import { useState, useEffect } from "react";
import { GraduationCap, BarChart3, Users, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Leaderboard from "@/components/Leaderboard";
import GradeSubmissionModal from "@/components/GradeSubmissionModal";
import PerformanceChart from "@/components/PerformanceChart";

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

const defaultStudents: Student[] = [
  {
    id: "1",
    name: "Emma Johnson",
    email: "emma.johnson@school.edu",
    totalScore: 475,
    averageGrade: 95.0,
    rank: 1,
    previousRank: 2,
    assignments: 5,
    lastSubmission: "2 hours ago",
  },
  {
    id: "2", 
    name: "Liam Chen",
    email: "liam.chen@school.edu",
    totalScore: 460,
    averageGrade: 92.0,
    rank: 2,
    previousRank: 1,
    assignments: 5,
    lastSubmission: "1 day ago",
  },
  {
    id: "3",
    name: "Sophia Rodriguez",
    email: "sophia.rodriguez@school.edu", 
    totalScore: 445,
    averageGrade: 89.0,
    rank: 3,
    previousRank: 4,
    assignments: 5,
    lastSubmission: "3 hours ago",
  },
  {
    id: "4",
    name: "Noah Williams",
    email: "noah.williams@school.edu",
    totalScore: 430,
    averageGrade: 86.0,
    rank: 4,
    previousRank: 3,
    assignments: 5,
    lastSubmission: "5 hours ago",
  },
  {
    id: "5",
    name: "Isabella Brown",
    email: "isabella.brown@school.edu",
    totalScore: 415,
    averageGrade: 83.0,
    rank: 5,
    previousRank: 5,
    assignments: 5,
    lastSubmission: "1 day ago",
  },
  {
    id: "6",
    name: "James Davis",
    email: "james.davis@school.edu", 
    totalScore: 400,
    averageGrade: 80.0,
    rank: 6,
    previousRank: 7,
    assignments: 5,
    lastSubmission: "2 days ago",
  },
  {
    id: "7",
    name: "Olivia Miller",
    email: "olivia.miller@school.edu",
    totalScore: 385,
    averageGrade: 77.0,
    rank: 7,
    previousRank: 6,
    assignments: 5,
    lastSubmission: "1 day ago",
  },
  {
    id: "8",
    name: "Benjamin Wilson",
    email: "benjamin.wilson@school.edu",
    totalScore: 370,
    averageGrade: 74.0,
    rank: 8,
    previousRank: 8,
    assignments: 5,
    lastSubmission: "3 days ago",
  },
];

const Index = () => {
  const [students, setStudents] = useState<Student[]>([]);

  // Load students from localStorage on component mount
  useEffect(() => {
    const savedStudents = localStorage.getItem('virtualClassroomStudents');
    if (savedStudents) {
      setStudents(JSON.parse(savedStudents));
    } else {
      // If no saved data, use default students
      setStudents(defaultStudents);
      localStorage.setItem('virtualClassroomStudents', JSON.stringify(defaultStudents));
    }
  }, []);

  // Save students to localStorage whenever students state changes
  useEffect(() => {
    if (students.length > 0) {
      localStorage.setItem('virtualClassroomStudents', JSON.stringify(students));
    }
  }, [students]);

  const handleSubmitGrade = (studentId: string, assignmentName: string, score: number) => {
    setStudents(prevStudents => {
      const updatedStudents = prevStudents.map(student => {
        if (student.id === studentId) {
          const newTotalScore = student.totalScore + score;
          const newAssignmentCount = student.assignments + 1;
          const newAverageGrade = newTotalScore / newAssignmentCount;
          
          return {
            ...student,
            totalScore: newTotalScore,
            averageGrade: newAverageGrade,
            assignments: newAssignmentCount,
            lastSubmission: "Just now",
          };
        }
        return student;
      });

      // Recalculate rankings
      const sortedStudents = [...updatedStudents].sort((a, b) => b.averageGrade - a.averageGrade);
      
      return sortedStudents.map((student, index) => ({
        ...student,
        previousRank: student.rank,
        rank: index + 1,
      }));
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Virtual Classroom</h1>
              <p className="text-muted-foreground">Real-time student performance tracking</p>
            </div>
          </div>
          <GradeSubmissionModal 
            students={students} 
            onSubmitGrade={handleSubmitGrade}
          />
        </div>

        {/* Main Content */}
        <Tabs defaultValue="leaderboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:grid-cols-2">
            <TabsTrigger value="leaderboard" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Leaderboard</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="leaderboard">
            <Leaderboard students={students} />
          </TabsContent>

          <TabsContent value="analytics">
            <PerformanceChart students={students} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;

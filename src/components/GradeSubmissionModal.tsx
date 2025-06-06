
import { useState } from "react";
import { Plus, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

interface Student {
  id: string;
  name: string;
  email: string;
}

interface GradeSubmissionModalProps {
  students: Student[];
  onSubmitGrade: (studentId: string, assignmentName: string, score: number) => void;
}

const GradeSubmissionModal = ({ students, onSubmitGrade }: GradeSubmissionModalProps) => {
  const [selectedStudent, setSelectedStudent] = useState("");
  const [assignmentName, setAssignmentName] = useState("");
  const [score, setScore] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedStudent || !assignmentName || !score) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const numericScore = parseFloat(score);
    if (isNaN(numericScore) || numericScore < 0 || numericScore > 100) {
      toast({
        title: "Error", 
        description: "Score must be a number between 0 and 100",
        variant: "destructive",
      });
      return;
    }

    onSubmitGrade(selectedStudent, assignmentName, numericScore);
    
    toast({
      title: "Grade Submitted",
      description: `Grade recorded for ${students.find(s => s.id === selectedStudent)?.name}`,
    });

    // Reset form
    setSelectedStudent("");
    setAssignmentName("");
    setScore("");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
          <Plus className="h-4 w-4 mr-2" />
          Submit Grade
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Submit New Grade</span>
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="student">Student</Label>
            <Select value={selectedStudent} onValueChange={setSelectedStudent}>
              <SelectTrigger>
                <SelectValue placeholder="Select a student" />
              </SelectTrigger>
              <SelectContent>
                {students.map((student) => (
                  <SelectItem key={student.id} value={student.id}>
                    {student.name} ({student.email})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="assignment">Assignment Name</Label>
            <Input
              id="assignment"
              value={assignmentName}
              onChange={(e) => setAssignmentName(e.target.value)}
              placeholder="e.g., Math Quiz #1"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="score">Score (0-100)</Label>
            <Input
              id="score"
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              placeholder="85.5"
            />
          </div>

          <div className="flex space-x-2 pt-4">
            <Button type="submit" className="flex-1">
              Submit Grade
            </Button>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GradeSubmissionModal;

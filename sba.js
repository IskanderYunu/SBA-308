/*const CourseInfo = {id: 451, name: "Introduction to JavaScript"};
// The provided assignment group.
const AssignmentGroup = {
  id: 12345, name: "Fundamentals of JavaScript", course_id: 451, group_weight: 25, assignments: [
    {id: 1, name: "Declare a Variable", due_at: "2023-01-25", points_possible: 50},
    {id: 2, name: "Write a Function", due_at: "2023-02-27", points_possible: 150},
    {id: 3, name: "Code the World", due_at: "3156-11-15", points_possible: 500}
  ]
};

const LearnerSubmissions = [
  {learner_id: 125, assignment_id: 1, submission: {Submitted_at: "2023-01-25", score: 47}},
  {learner_id: 125, assignment_id: 2, submission: {submitted_at: "2023-02-12", score: 150}},
  {learner_id: 125, assignment_id: 3, submission: {submitted_at: "2023-01-25", score: 400}},
  {learner_id: 132, assignment_id: 1, submission: {submitted_at: "2023-01-24", score: 39}},
  {learner_id: 132, assignment_id: 2, submission: {Submitted_at: "2023-03-07", score: 140}}
]; */

// [] = an array  {} = an Object AssignmentGroup = {object[array of{objects}]}  LearnerSumbmissions = [array of{objects{objects in an object}}]


// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};

// The provided learner submission data.

const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];
// ========================================================

function getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions) {
  try {
    // Throw Error: Between Assingment Group and CourseInfo
    if (AssignmentGroup.course_id !== CourseInfo.id) throw new Error("Mismatched Course");

    const currentDate = new Date();
    const assignmentsMap = {};

    // Filter assingments and points
    AssignmentGroup.assignments.forEach(assignment => {
      const dueDate = new Date(assignment.due_at);

      if (dueDate <= currentDate && typeof assignment.points_possible === 'number' && assignment.points_possible > 0) {
        assignmentsMap[assignment.id] = assignment;
      } else if (dueDate <= currentDate) {
        throw new Error("InvalidPointsPossible");
      }
    });
    const learners = {};

    // Process each submission and skip invalid ones
    LearnerSubmissions.forEach(({ learner_id, assignment_id, submission }) => {
      const assignment = assignmentsMap[assignment_id];
      if (!assignment) return; 

      const { submitted_at, score } = submission;
      const dueDate = new Date(assignment.due_at);
      const submissionDate = new Date(submitted_at);
      let finalScore = score;

      // Late assingments get late penalty
      if (submissionDate > dueDate) finalScore -= assignment.points_possible * 0.10;

      // Validate score
      if (typeof finalScore !== 'number' || finalScore < 0) throw new Error("InvalidScore");

      // Initialize learner entry if it doesn't exist
      if (!learners[learner_id]) {
        learners[learner_id] = { id: learner_id, avg: 0, totalWeightedScore: 0, totalPoints: 0 };
      }

      // Calculate percentage and add scores for weighted average

      const percentage = (finalScore / assignment.points_possible) * 100;
      learners[learner_id][assignment_id] = Math.max(0, percentage);
      learners[learner_id].totalWeightedScore += Math.max(0, finalScore);
      learners[learner_id].totalPoints += assignment.points_possible;
    });

    // Finalize averages for each learner
    return Object.values(learners).map(learner => {
      learner.avg = learner.totalPoints > 0 ? (learner.totalWeightedScore / learner.totalPoints) * 100 : 0;
      delete learner.totalWeightedScore;
      delete learner.totalPoints;
      return learner;
    });

  } catch (error) {
    // Using switch statement
    switch (error.message) {
      case "Mismatched Course":
        console.log("Error: Wrong Course.");
        break;
    }
    return [];
  }
}

console.log(getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions));

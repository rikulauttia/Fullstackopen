interface ExerciseResult {
  periodLength: number; // Total days in the period
  trainingDays: number; // Days with training > 0
  target: number; // Target hours per day
  average: number; // Average hours of exercise per day
  success: boolean; // Whether the target was reached
  rating: number; // Rating from 1 to 3
  ratingDescription: string; // Text description of the rating
}

const calculateExercises = (
  dailyHours: number[],
  target: number
): ExerciseResult => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter((day) => day > 0).length;
  const totalHours = dailyHours.reduce((sum, hours) => sum + hours, 0);
  const average = totalHours / periodLength;
  const success = average >= target;

  // Determining rating and descricption!
  let rating: number;
  let ratingDescription: string;

  if (average >= target) {
    rating = 3;
    ratingDescription = "Excellent! You exceeded your target.";
  } else if (average >= target * 0.75) {
    rating = 2;
    ratingDescription = "Not too bad but could be better.";
  } else {
    rating = 1;
    ratingDescription = "You need to improve to meet your target!";
  }

  return {
    periodLength,
    trainingDays,
    target,
    average,
    success,
    rating,
    ratingDescription,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));

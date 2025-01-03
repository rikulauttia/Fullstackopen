interface ExerciseResult {
  periodLength: number; // Total days in the period
  trainingDays: number; // Days with training > 0
  target: number; // Target hours per day
  average: number; // Average hours of exercise per day
  success: boolean; // Whether the target was reached
  rating: number; // Rating from 1 to 3
  ratingDescription: string; // Text description of the rating
}

export const calculateExercises = (
  dailyHours: number[],
  target: number
): ExerciseResult => {
  if (
    !Array.isArray(dailyHours) ||
    dailyHours.some((h) => typeof h !== "number" || h < 0)
  ) {
    throw new Error(
      "Invalid daily hours array. Must be an array of non-negative numbers."
    );
  }
  if (typeof target !== "number" || target <= 0) {
    throw new Error("Invalid target. Must be a positive number.");
  }
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

// Command-line integration
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.log("calculateExercises <target> <daily hours...>");
    process.exit(1);
  }

  const target = Number(args[0]);
  const dailyHours = args.slice(1).map(Number);

  if (isNaN(target) || dailyHours.some((h) => isNaN(h))) {
    console.log("Error: Target and all daily hours must be valid numbers.");
    process.exit(1);
  }

  try {
    console.log(calculateExercises(dailyHours, target));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    } else {
      console.error("Unknown error occurred");
    }
  }
}

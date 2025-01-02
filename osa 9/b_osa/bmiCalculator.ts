export const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters = height / 100; // koska pituus annetaan cm
  const bmi = weight / (heightInMeters * heightInMeters);

  // BMI categories
  if (bmi < 18.5) {
    return "Underwight";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return "Normal range";
  } else if (bmi >= 25 && bmi <= 29.9) {
    return "Overweight";
  } else {
    return "Obese";
  }
};

// command line integration
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length !== 2) {
    console.log("calculateBmi <height in cm> <weight in kg>");
    process.exit(1);
  }

  const [height, weight] = args.map(Number);

  if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
    console.log("Error: Both height and weight must be positive numbers.");
    process.exit(1);
  }

  console.log(calculateBmi(height, weight));
}

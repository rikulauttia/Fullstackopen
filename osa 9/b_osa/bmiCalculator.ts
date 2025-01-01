const calculateBmi = (height: number, weight: number): string => {
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

console.log(calculateBmi(180, 74));

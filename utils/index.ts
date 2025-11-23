export async function fetchCars() {
  const headers = {
    "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPID_API_KEY || "",
    "x-rapidapi-host": "cars-by-api-ninjas.p.rapidapi.com",
  };
  const response = await fetch(
    "https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=corolla",
    { headers },
  );

  if (!response.ok) {
    console.error(
      "Failed to fetch cars:",
      response.status,
      response.statusText,
    );
    return [];
  }

  const result = await response.json();
  return result;
}

export const estimateCarRent = (
  year: number,
  displacement: number, // e.g. 1.6, 2.0, 3.5
  fuel_type: string, // e.g. "gas", "diesel", "electric"
  drive: string, // e.g. "fwd", "rwd", "awd", "4wd"
): string => {
  const basePricePerDay = 45; // base price in USD

  const currentYear = new Date().getFullYear();
  const age = Math.max(0, currentYear - year);

  // Age factor: older cars get cheaper (2.5% off per year, max 60%)
  const ageMultiplier = Math.max(0.4, 1 - age * 0.025);

  // Engine factor: each liter adds a bit
  const engineFee = displacement * 8; // e.g. 2.0L -> +16, 3.5L -> +28

  // Fuel factor
  const normalizedFuel = fuel_type.toLowerCase();
  const fuelMultiplier =
    normalizedFuel === "electric"
      ? 1.2
      : normalizedFuel === "diesel"
        ? 1.1
        : 1.0;

  // Drive factor
  const normalizedDrive = drive.toLowerCase();
  const driveMultiplier =
    normalizedDrive === "awd" || normalizedDrive === "4wd" ? 1.15 : 1.0;

  const rawPrice =
    basePricePerDay * ageMultiplier * fuelMultiplier * driveMultiplier +
    engineFee;

  // Return rounded price as a string (same style as your original function)
  return rawPrice.toFixed(0);
};

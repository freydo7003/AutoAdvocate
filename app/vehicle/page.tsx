"use client";

import { FormEvent, useState } from "react";

type Vehicle = {
  year: string;
  make: string;
  model: string;
  engine: string;
  mileage: string;
};

export default function VehiclePage() {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);

  function saveVehicle(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setVehicle({
      year: String(data.get("year") || ""),
      make: String(data.get("make") || ""),
      model: String(data.get("model") || ""),
      engine: String(data.get("engine") || ""),
      mileage: String(data.get("mileage") || "")
    });
  }

  return (
    <main className="shell">
      <div className="card">
        <h1>My vehicle</h1>
        <p className="muted">Tell AutoAdvocate which vehicle you own.</p>

        <form className="form" onSubmit={saveVehicle}>
          <label>Year<input name="year" required placeholder="2017" /></label>
          <label>Make<input name="make" required placeholder="Ford" /></label>
          <label>Model<input name="model" required placeholder="F-150" /></label>
          <label>Engine<input name="engine" placeholder="5.0L V8" /></label>
          <label>Mileage<input name="mileage" inputMode="numeric" placeholder="125000" /></label>
          <button className="btn" type="submit">Save vehicle</button>
        </form>

        {vehicle && (
          <div className="result">
            <span className="badge success">Vehicle saved</span>
            <h2>{vehicle.year} {vehicle.make} {vehicle.model}</h2>
            <p>Engine: {vehicle.engine || "Not entered"}<br />Mileage: {vehicle.mileage || "Not entered"}</p>
          </div>
        )}
      </div>
    </main>
  );
}

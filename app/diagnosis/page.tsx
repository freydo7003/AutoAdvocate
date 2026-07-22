"use client";

import { FormEvent, useMemo, useState } from "react";
import { findObdCode, normalizeObdCode, obdCodes, type ObdCode } from "../../lib/obd-codes";
import styles from "./diagnosis.module.css";

function ListSection({ title, items }: { title: string; items: string[] }) {
  return <section className={styles.section}><h3>{title}</h3><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></section>;
}

export default function DiagnosisPage() {
  const [input, setInput] = useState("");
  const [searchedCode, setSearchedCode] = useState("");
  const result = useMemo<ObdCode | undefined>(() => searchedCode ? findObdCode(searchedCode) : undefined, [searchedCode]);

  function submit(event: FormEvent) {
    event.preventDefault();
    setSearchedCode(normalizeObdCode(input));
  }

  return <main className={styles.page}>
    <div className={styles.hero}>
      <p className={styles.eyebrow}>AutoAdvocate Code Lookup</p>
      <h1>Understand your trouble code</h1>
      <p>Enter a five-character OBD-II code such as <strong>P0302</strong>. A code identifies the system that noticed a problem; it does not prove which part should be replaced.</p>
    </div>

    <form className={styles.search} onSubmit={submit}>
      <label htmlFor="obd-code">OBD-II code</label>
      <div className={styles.searchRow}>
        <input id="obd-code" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Example: P0420" autoCapitalize="characters" maxLength={7}/>
        <button type="submit">Look up code</button>
      </div>
      <small>{obdCodes.length} common generic powertrain codes included.</small>
    </form>

    {searchedCode && !result && <div className={styles.notice}>
      <h2>{searchedCode || "Unknown code"} is not in this starter database yet.</h2>
      <p>Confirm the code was entered correctly. Manufacturer-specific codes may require the vehicle year, make, model, engine, and factory service information.</p>
    </div>}

    {result && <article className={styles.result}>
      <div className={styles.resultHeader}>
        <div><span className={styles.code}>{result.code}</span><h2>{result.title}</h2><p>{result.summary}</p></div>
        <div className={styles.badges}><span>{result.system}</span><span>Severity: {result.severity}</span><span>{result.generic ? "Generic code" : "Manufacturer-specific"}</span></div>
      </div>
      <div className={styles.warning}><strong>Driving guidance:</strong> {result.drivingAdvice}</div>
      <div className={styles.grid}>
        <ListSection title="Common symptoms" items={result.symptoms}/>
        <ListSection title="Possible causes" items={result.possibleCauses}/>
        <ListSection title="Reasonable next checks" items={result.recommendedChecks}/>
        <ListSection title="Questions to ask the shop" items={result.questionsForShop}/>
      </div>
      <p className={styles.disclaimer}>Educational guidance only. Trouble codes are starting points, not part-replacement instructions. Safety-critical symptoms, flashing warning lights, overheating, fuel leaks, brake problems, or severe drivability issues require prompt professional inspection.</p>
    </article>}
  </main>;
}

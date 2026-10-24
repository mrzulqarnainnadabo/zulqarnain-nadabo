'use client';
import { useEffect, useState } from 'react';

/**
 * The one "living" detail: local time in Abuja (WAT).
 * Server renders the plain location, the client adds the time after mount,
 * so there is no hydration mismatch and no layout shift.
 */
export default function LocalTime({ place }) {
  const [time, setTime] = useState(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Lagos' });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);
  return (
    <span>
      {place}
      {time && <span className="text-goldl"> · {time} WAT</span>}
    </span>
  );
}

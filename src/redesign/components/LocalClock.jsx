import { useEffect, useState } from "react";

/**
 * LocalClock — shows the current time in a given IANA timezone, updated each
 * minute. A small, human "I'm a real person in Berlin right now" signal.
 */
export default function LocalClock({ timezone = "Europe/Berlin" }) {
    const format = () =>
        new Intl.DateTimeFormat("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: timezone,
        }).format(new Date());

    const [time, setTime] = useState(format);

    useEffect(() => {
        const id = setInterval(() => setTime(format()), 30000);
        return () => clearInterval(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timezone]);

    return (
        <span>
            {time} <span style={{ color: "var(--sg-faint)" }}>Berlin</span>
        </span>
    );
}

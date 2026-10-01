export default function InspectNote({ title, items, side = "right", placement = "default" }) {
    return (
        <aside
            className={`sg-inspect-note sg-inspect-note--${placement}`}
            data-side={side}
            aria-hidden="true"
        >
            <span className="sg-inspect-note__pulse" />
            <div>
                <strong>{title}</strong>
                <ul>
                    {items.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}

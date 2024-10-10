interface SelectBarProps {
    options: string[];
    selected: string;
}

export default function SelectBar({ options, selected }: SelectBarProps) {
    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            {options.map((option) => (
                <div key={option} style={{margin: "1rem"}}>
                    {option}
                </div>
            ))}
        </div>
    );
}
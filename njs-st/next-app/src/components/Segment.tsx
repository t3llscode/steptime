export default function Segment({ radius, stroke, rotation, percentage, reversed, background, foreground }) {

  const SIZE = radius + stroke;
  const CIRCUMFERENCE = Math.PI * radius * 8;

  return (
    <div>
      <svg height={SIZE} width={SIZE} style={{transform: `rotate(${rotation}deg)`}}>
          <circle r={radius} stroke={background} strokeWidth={stroke} fill="transparent" />
          <circle r={radius} stroke={foreground} strokeWidth={stroke} fill="transparent" pathLength={CIRCUMFERENCE} strokeDasharray={`${percentage * CIRCUMFERENCE * 0.25} ${CIRCUMFERENCE}`} style={reversed ? { transform: `scaleX(-1) rotate(90deg)` } : {}} />
      </svg> 
    </div>
  );
}
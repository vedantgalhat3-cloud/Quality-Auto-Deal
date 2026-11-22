<script type="text/babel">
  const { useState, useEffect } = React;

  function useCountUp(target, duration = 1400) {
    const [value, setValue] = useState(0);
    useEffect(() => {
      let start = null;
      let frame;
      function step(ts) {
        if (start === null) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        setValue(Math.floor(progress * target));
        if (progress < 1) frame = requestAnimationFrame(step);
      }
      frame = requestAnimationFrame(step);
      return () => cancelAnimationFrame(frame);
    }, [target, duration]);
    return value;
  }

  function Stat({ value, suffix = '', label }) {
    return (
      <div className="pulse-stat">
        <div className="pulse-num">{value.toLocaleString()}{suffix}</div>
        <div className="pulse-label">{label}</div>
      </div>
    );
  }

  function ShowroomPulse() {
    const bikes = useCountUp(1240);
    const riders = useCountUp(860);
    const days = useCountUp(4, 900);
    return (
      <React.Fragment>
        <Stat value={bikes} suffix="+" label="Bikes inspected" />
        <Stat value={riders} suffix="+" label="Happy riders" />
        <Stat value={days} label="Avg. days to sale" />
      </React.Fragment>
    );
  }

  ReactDOM.createRoot(document.getElementById('showroom-pulse')).render(<ShowroomPulse />);
</script>

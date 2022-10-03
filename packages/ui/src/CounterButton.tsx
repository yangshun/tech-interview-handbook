import * as React from 'react';

export function CounterButton() {
  const [count, setCount] = React.useState(0);
  return (
    <div
      style={{
        background: `rgba(0,0,0,0.05)`,
        borderRadius: `8px`,
        fontWeight: 500,
        padding: '1.5rem',
      }}>
      <p className="text-green-500" style={{ margin: '0 0 1.5rem 0' }}>
        This component is from{' '}
        <code
          style={{
            background: `rgba(0,0,0,0.1)`,
            borderRadius: '0.25rem',
            padding: '0.2rem 0.3rem',
          }}>
          @tih/ui
        </code>
      </p>
      <div>
        <button
          style={{
            background: 'black',
            border: 'none',
            borderRadius: '0.25rem',
            color: 'white',
            cursor: 'pointer',
            display: 'inline-block',
            padding: '0.5rem 1rem',
          }}
          type="button"
          onClick={() => setCount((c) => c + 1)}>
          Count: {count}
        </button>
      </div>
    </div>
  );
}

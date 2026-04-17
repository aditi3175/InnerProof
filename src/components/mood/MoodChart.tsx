import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { MoodEntry } from '@/types';

interface MoodChartProps {
  data: MoodEntry[];
}

export function MoodChart({ data }: MoodChartProps) {
  const chartData = data.map((entry, i) => ({
    name: `Day ${i + 1}`,
    date: new Date(entry.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    }),
    score: entry.combinedScore,
    ai: Math.round(entry.sessionScore * 10),
    self: entry.selfRating * 20,
  }));

  if (chartData.length === 0) {
    return (
      <div className="mood-chart-empty">
        <span style={{ fontSize: '1.5rem', opacity: 0.2 }}>📊</span>
        <p className="text-body">Complete sessions to see your progress chart</p>
      </div>
    );
  }

  return (
    <div className="mood-chart-container animate-fade-in">
      <div className="mood-chart-header">
        <div>
          <h3 className="heading-3">Progress Analytics</h3>
          <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '0.8rem', color: 'var(--platinum)' }}>
            tracking your resilience
          </span>
        </div>
        <div className="chart-legend">
          <div className="chart-legend-item">
            <span className="chart-legend-dot chart-dot-primary"></span>
            Combined
          </div>
          <div className="chart-legend-item">
            <span className="chart-legend-dot chart-dot-secondary"></span>
            AI Rating
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="glowScore" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity={0.2} />
              <stop offset="50%" stopColor="#ffffff" stopOpacity={0.05} />
              <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="glowAi" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity={0.08} />
              <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
            </linearGradient>
            <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          
          <XAxis
            dataKey="date"
            tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11, fontWeight: 500 }}
            axisLine={{ stroke: 'rgba(255,255,255,0.04)' }}
            tickLine={false}
            dy={10}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11, fontWeight: 500 }}
            axisLine={false}
            tickLine={false}
            dx={-10}
          />
          
          <Tooltip
            contentStyle={{
              background: 'rgba(10, 10, 10, 0.9)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              color: '#ffffff',
              padding: '12px 16px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)',
            }}
            itemStyle={{ fontSize: '0.85rem', fontWeight: 600, padding: '2px 0' }}
            labelStyle={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}
            cursor={{ stroke: 'rgba(255,255,255,0.06)', strokeWidth: 1 }}
          />

          <Area
            type="monotone"
            dataKey="ai"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth={1.5}
            fill="url(#glowAi)"
            name="AI Assessment"
            dot={false}
            strokeDasharray="4 4"
          />
          <Area
            type="monotone"
            dataKey="score"
            stroke="#ffffff"
            strokeWidth={2.5}
            fill="url(#glowScore)"
            name="Combined Score"
            filter="url(#neonGlow)"
            dot={{ r: 3, fill: '#ffffff', strokeWidth: 0 }}
            activeDot={{ r: 6, fill: '#ffffff', stroke: 'rgba(255,255,255,0.3)', strokeWidth: 4 }}
          />
        </AreaChart>
      </ResponsiveContainer>

      <style>{`
        .mood-chart-container {
          width: 100%;
          padding: 28px;
          background: var(--glass-bg);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-xl);
          position: relative;
          overflow: hidden;
        }

        .mood-chart-container::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
        }

        .mood-chart-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 24px;
        }

        .mood-chart-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 56px 0;
          text-align: center;
          background: var(--glass-bg);
          border: 1px dashed var(--glass-border);
          border-radius: var(--radius-xl);
          backdrop-filter: blur(12px);
        }

        .chart-legend {
          display: flex;
          gap: 16px;
        }

        .chart-legend-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--text-muted);
        }

        .chart-legend-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .chart-dot-primary {
          background: #ffffff;
          box-shadow: 0 0 8px rgba(255,255,255,0.5);
          animation: pulseGlow 2s ease-in-out infinite;
        }

        .chart-dot-secondary {
          background: rgba(255,255,255,0.35);
        }
      `}</style>
    </div>
  );
}

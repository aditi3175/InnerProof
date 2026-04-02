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
        <span style={{ fontSize: '2rem' }}>📊</span>
        <p className="text-body">Complete sessions to see your progress chart</p>
      </div>
    );
  }

  return (
    <div className="mood-chart-container animate-fade-in">
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="gradientScore" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6c63ff" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#6c63ff" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradientAi" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#38b2ac" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#38b2ac" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            tick={{ fill: 'rgba(255,255,254,0.4)', fontSize: 11 }}
            axisLine={{ stroke: 'rgba(255,255,254,0.08)' }}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: 'rgba(255,255,254,0.4)', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              background: 'rgba(15, 14, 23, 0.95)',
              border: '1px solid rgba(255,255,254,0.1)',
              borderRadius: '12px',
              color: '#fffffe',
              fontSize: '0.85rem',
              backdropFilter: 'blur(12px)',
            }}
            labelStyle={{ color: 'rgba(255,255,254,0.7)' }}
          />
          <Area
            type="monotone"
            dataKey="score"
            stroke="#6c63ff"
            strokeWidth={2}
            fill="url(#gradientScore)"
            name="Combined Score"
            dot={{ r: 3, fill: '#6c63ff', strokeWidth: 0 }}
            activeDot={{ r: 5, fill: '#6c63ff', stroke: '#fff', strokeWidth: 2 }}
          />
          <Area
            type="monotone"
            dataKey="ai"
            stroke="#38b2ac"
            strokeWidth={1.5}
            fill="url(#gradientAi)"
            name="AI Assessment"
            dot={false}
            strokeDasharray="4 4"
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="chart-legend">
        <div className="chart-legend-item">
          <span className="chart-legend-dot" style={{ background: '#6c63ff' }} />
          Combined Score
        </div>
        <div className="chart-legend-item">
          <span className="chart-legend-dot" style={{ background: '#38b2ac', opacity: 0.7 }} />
          AI Assessment
        </div>
      </div>

      <style>{`
        .mood-chart-container {
          width: 100%;
        }

        .mood-chart-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 48px 0;
          text-align: center;
        }

        .chart-legend {
          display: flex;
          justify-content: center;
          gap: 24px;
          margin-top: 12px;
        }

        .chart-legend-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .chart-legend-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
}

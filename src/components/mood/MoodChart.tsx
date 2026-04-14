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
    <div className="mood-chart-container animate-fade-in glass" style={{ padding: '24px', borderRadius: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h3 className="heading-3" style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#6c63ff' }}>📈</span> Progress Analytics
        </h3>
        <div className="chart-legend">
          <div className="chart-legend-item">
            <span className="chart-legend-dot glow-purple"></span>
            Combined
          </div>
          <div className="chart-legend-item">
            <span className="chart-legend-dot glow-cyan"></span>
            AI Rating
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={chartData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="gradientScore" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6c63ff" stopOpacity={0.5} />
              <stop offset="100%" stopColor="#6c63ff" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradientAi" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00f2fe" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#4facfe" stopOpacity={0} />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          
          <XAxis
            dataKey="date"
            tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 500 }}
            axisLine={{ stroke: 'rgba(255,255,255,0.05)' }}
            tickLine={false}
            dy={10}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 500 }}
            axisLine={false}
            tickLine={false}
            dx={-10}
          />
          
          <Tooltip
            contentStyle={{
              background: 'rgba(15, 14, 23, 0.75)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '16px',
              color: '#fffffe',
              padding: '12px 16px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)'
            }}
            itemStyle={{ fontSize: '0.9rem', fontWeight: 600, padding: '4px 0' }}
            labelStyle={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}
            cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, strokeDasharray: '4 4' }}
          />

          <Area
            type="monotone"
            dataKey="ai"
            stroke="#00f2fe"
            strokeWidth={2}
            fill="url(#gradientAi)"
            name="AI Assessment"
            dot={{ r: 4, fill: '#00f2fe', strokeWidth: 0, filter: 'url(#glow)' }}
            activeDot={{ r: 6, fill: '#fff', stroke: '#00f2fe', strokeWidth: 2, filter: 'url(#glow)' }}
          />
          <Area
            type="monotone"
            dataKey="score"
            stroke="#6c63ff"
            strokeWidth={3}
            fill="url(#gradientScore)"
            name="Combined Score"
            dot={{ r: 5, fill: '#6c63ff', stroke: '#fff', strokeWidth: 2, filter: 'url(#glow)' }}
            activeDot={{ r: 8, fill: '#fff', stroke: '#6c63ff', strokeWidth: 3, filter: 'url(#glow)' }}
          />
        </AreaChart>
      </ResponsiveContainer>

      <style>{`
        .mood-chart-container {
          width: 100%;
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          position: relative;
          overflow: hidden;
        }

        .mood-chart-container::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(108, 99, 255, 0.5), transparent);
        }

        .mood-chart-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding: 64px 0;
          text-align: center;
          background: rgba(15, 14, 23, 0.4);
          border-radius: 24px;
          border: 1px dashed rgba(255, 255, 255, 0.1);
        }

        .chart-legend {
          display: flex;
          gap: 16px;
        }

        .chart-legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          color: rgba(255,255,255,0.7);
        }

        .chart-legend-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .glow-purple {
          background: #6c63ff;
          box-shadow: 0 0 10px #6c63ff;
        }

        .glow-cyan {
          background: #00f2fe;
          box-shadow: 0 0 10px #00f2fe;
        }
      `}</style>
    </div>
  );
}

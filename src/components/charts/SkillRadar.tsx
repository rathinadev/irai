'use client';

import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

interface SkillRadarProps {
  data: {
    flexibility: number;
    strength: number;
    breathing: number;
    mentalFocus: number;
    painReduction: number;
    consistency: number;
  };
  comparisonData?: {
    flexibility: number;
    strength: number;
    breathing: number;
    mentalFocus: number;
    painReduction: number;
    consistency: number;
  };
  height?: number;
}

export function SkillRadar({ data, comparisonData, height = 350 }: SkillRadarProps) {
  const chartData = [
    { subject: 'Flexibility', current: data.flexibility, previous: comparisonData?.flexibility || 0, fullMark: 100 },
    { subject: 'Strength', current: data.strength, previous: comparisonData?.strength || 0, fullMark: 100 },
    { subject: 'Breathing', current: data.breathing, previous: comparisonData?.breathing || 0, fullMark: 100 },
    { subject: 'Focus', current: data.mentalFocus, previous: comparisonData?.mentalFocus || 0, fullMark: 100 },
    { subject: 'Consistency', current: data.consistency, previous: comparisonData?.consistency || 0, fullMark: 100 },
    { subject: 'Pain Reduction', current: data.painReduction, previous: comparisonData?.painReduction || 0, fullMark: 100 },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ backgroundColor: 'var(--white)', padding: '10px', border: '1px solid var(--gray-100)', borderRadius: '8px', boxShadow: 'var(--shadow-sm)' }}>
          <p style={{ margin: '0 0 5px 0', fontWeight: 600, color: 'var(--blue-deep)' }}>{payload[0].payload.subject}</p>
          <p style={{ margin: 0, color: 'var(--teal)' }}>Current: {payload[0].value}%</p>
          {comparisonData && (
            <p style={{ margin: 0, color: 'var(--gray-500)' }}>Previous: {payload[1].value}%</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer>
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#475569', fontSize: 12, fontWeight: 500 }} 
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          
          <Tooltip content={<CustomTooltip />} />
          
          {comparisonData && (
            <Radar
              name="Previous Month"
              dataKey="previous"
              stroke="#cbd5e1"
              fill="#e2e8f0"
              fillOpacity={0.4}
              isAnimationActive={true}
            />
          )}
          
          <Radar
            name="Current Month"
            dataKey="current"
            stroke="#1A9E9E"
            fill="#1A9E9E"
            fillOpacity={0.6}
            isAnimationActive={true}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

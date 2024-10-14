import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectItem } from '../ui/select';

const defaultTrends = {
  "#summervibes": { baseTrend: 1000, volatility: 100 },
  "#fitnessmotivation": { baseTrend: 800, volatility: 80 },
  "#foodie": { baseTrend: 1200, volatility: 120 },
  "#travelgram": { baseTrend: 950, volatility: 90 },
  "#fashionista": { baseTrend: 1100, volatility: 110 }
};

const generateData = (baseTrend, volatility, days) => {
  let data = [];
  let value = baseTrend;
  for (let i = 0; i < days; i++) {
    value += (Math.random() - 0.5) * volatility;
    data.push({
      day: i + 1,
      trend: Math.max(0, Math.round(value))
    });
  }
  return data;
};

const predictFutureTrend = (data, days) => {
  const lastValue = data[data.length - 1].trend;
  const avgChange = (data[data.length - 1].trend - data[0].trend) / data.length;
  return data.concat(
    Array.from({ length: days }, (_, i) => ({
      day: data.length + i + 1,
      trend: Math.max(0, Math.round(lastValue + avgChange * (i + 1)))
    }))
  );
};

const TrendPredictor = () => {
  const [data, setData] = useState([]);
  const [predictedData, setPredictedData] = useState([]);
  const [selectedTrend, setSelectedTrend] = useState('');
  const [customTrendName, setCustomTrendName] = useState('');
  const [predictionDays, setPredictionDays] = useState(7);

  useEffect(() => {
    if (selectedTrend) {
      const { baseTrend, volatility } = defaultTrends[selectedTrend];
      setData(generateData(baseTrend, volatility, 30));
    }
  }, [selectedTrend]);

  const handlePredict = () => {
    setPredictedData(predictFutureTrend(data, predictionDays));
  };

  const handleTrendChange = (value) => {
    setSelectedTrend(value);
    setCustomTrendName('');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-100 min-h-screen">
      <Card className="mb-6 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4">
          <h2 className="text-2xl font-bold">Instagram Trend Predictor</h2>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Trend</label>
              <Select onValueChange={handleTrendChange} value={selectedTrend} className="w-full">
                <option value="">Choose a trend</option>
                {Object.keys(defaultTrends).map((trend) => (
                  <SelectItem key={trend} value={trend}>{trend}</SelectItem>
                ))}
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Custom Trend</label>
              <Input
                type="text"
                value={customTrendName}
                onChange={(e) => setCustomTrendName(e.target.value)}
                placeholder="Or enter custom trend"
                className="w-full"
              />
            </div>
          </div>
          <div className="flex gap-4 mb-6">
            <div className="flex-grow">
              <label className="block text-sm font-medium text-gray-700 mb-1">Prediction Days</label>
              <Input
                type="number"
                value={predictionDays}
                onChange={(e) => setPredictionDays(parseInt(e.target.value))}
                placeholder="Prediction days"
                className="w-full"
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handlePredict} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Predict
              </Button>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={predictedData.length > 0 ? predictedData : data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="trend" stroke="#8884d8" name={customTrendName || selectedTrend || 'Trend'} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrendPredictor;
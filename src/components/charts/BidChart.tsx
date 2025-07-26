import React, { useState, useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
  TooltipItem,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { TrendingUp, Users, Clock, DollarSign } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface BidData {
  id: string;
  amount: number;
  timestamp: Date;
  bidder: string;
  isWinning: boolean;
}

interface BidChartProps {
  songId: string;
  currentBid: number;
  startingBid: number;
  endTime: Date;
}

const BidChart: React.FC<BidChartProps> = ({ songId, currentBid, startingBid, endTime }) => {
  const [bidHistory, setBidHistory] = useState<BidData[]>([]);
  const [showBidHistory, setShowBidHistory] = useState(false);
  const [timeRange, setTimeRange] = useState<'1h' | '6h' | '24h' | 'all'>('all');
  const chartRef = useRef<ChartJS<'line'>>(null);

  // Generate realistic bid history data
  useEffect(() => {
    const generateBidHistory = (): BidData[] => {
      const now = new Date();
      const auctionStart = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 24 hours ago
      const bids: BidData[] = [];
      
      // Starting bid
      bids.push({
        id: '1',
        amount: startingBid,
        timestamp: auctionStart,
        bidder: 'System',
        isWinning: false
      });

      // Generate progressive bids with realistic patterns
      const bidders = ['MusicPro_2024', 'StudioMax', 'BeatMaster', 'SoundWave', 'AudioCraft', 'MelodyMaker'];
      let currentAmount = startingBid;
      const totalBids = Math.floor(Math.random() * 15) + 10; // 10-25 bids
      
      for (let i = 1; i < totalBids; i++) {
        const timeOffset = (24 * 60 * 60 * 1000 * i) / totalBids;
        const bidTime = new Date(auctionStart.getTime() + timeOffset);
        
        // Increase bid by 5-20%
        const increase = currentAmount * (0.05 + Math.random() * 0.15);
        currentAmount += increase;
        
        bids.push({
          id: (i + 1).toString(),
          amount: Math.round(currentAmount),
          timestamp: bidTime,
          bidder: bidders[Math.floor(Math.random() * bidders.length)],
          isWinning: i === totalBids - 1
        });
      }

      return bids;
    };

    setBidHistory(generateBidHistory());
  }, [songId, startingBid]);

  // Filter data based on time range
  const getFilteredData = () => {
    if (timeRange === 'all') return bidHistory;
    
    const now = new Date();
    const cutoff = new Date();
    
    switch (timeRange) {
      case '1h':
        cutoff.setHours(now.getHours() - 1);
        break;
      case '6h':
        cutoff.setHours(now.getHours() - 6);
        break;
      case '24h':
        cutoff.setDate(now.getDate() - 1);
        break;
    }
    
    return bidHistory.filter(bid => bid.timestamp >= cutoff);
  };

  const filteredData = getFilteredData();

  const chartData = {
    labels: filteredData.map(bid => 
      bid.timestamp.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      })
    ),
    datasets: [
      {
        label: 'Bid Amount',
        data: filteredData.map(bid => bid.amount),
        borderColor: '#6366F1',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: filteredData.map(bid => bid.isWinning ? '#F59E0B' : '#6366F1'),
        pointBorderColor: '#FFFFFF',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      }
    ]
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index',
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        titleColor: '#F1F5F9',
        bodyColor: '#F1F5F9',
        borderColor: '#6366F1',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          title: (context: TooltipItem<'line'>[]) => {
            const dataIndex = context[0].dataIndex;
            const bid = filteredData[dataIndex];
            return `${bid.timestamp.toLocaleString()}`;
          },
          label: (context: TooltipItem<'line'>) => {
            const dataIndex = context.dataIndex;
            const bid = filteredData[dataIndex];
            return [
              `Amount: $${bid.amount.toLocaleString()}`,
              `Bidder: ${bid.bidder}`,
              bid.isWinning ? '🏆 Winning Bid' : ''
            ].filter(Boolean);
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(148, 163, 184, 0.1)',
        },
        ticks: {
          color: '#64748B',
          maxTicksLimit: 8,
        }
      },
      y: {
        grid: {
          color: 'rgba(148, 163, 184, 0.1)',
        },
        ticks: {
          color: '#64748B',
          callback: function(value) {
            return '$' + Number(value).toLocaleString();
          }
        }
      }
    },
    onHover: (event, elements) => {
      if (elements.length > 0) {
        setShowBidHistory(true);
      }
    },
    onLeave: () => {
      setTimeout(() => setShowBidHistory(false), 2000);
    }
  };

  const stats = {
    totalBids: bidHistory.length,
    averageIncrease: bidHistory.length > 1 
      ? Math.round(((currentBid - startingBid) / (bidHistory.length - 1)))
      : 0,
    timeRemaining: Math.max(0, endTime.getTime() - new Date().getTime()),
    uniqueBidders: new Set(bidHistory.map(bid => bid.bidder)).size
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 h-full">
      {/* Chart Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-1">Bid History</h3>
          <p className="text-sm text-gray-500">Real-time auction progress</p>
        </div>
        
        {/* Time Range Selector */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          {(['1h', '6h', '24h', 'all'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                timeRange === range
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {range === 'all' ? 'All' : range.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="text-center">
          <div className="flex items-center justify-center w-8 h-8 bg-indigo-100 rounded-lg mx-auto mb-2">
            <TrendingUp className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-lg font-semibold text-gray-900">{stats.totalBids}</div>
          <div className="text-xs text-gray-500">Total Bids</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center w-8 h-8 bg-amber-100 rounded-lg mx-auto mb-2">
            <DollarSign className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-lg font-semibold text-gray-900">${stats.averageIncrease}</div>
          <div className="text-xs text-gray-500">Avg Increase</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-lg mx-auto mb-2">
            <Users className="w-4 h-4 text-green-600" />
          </div>
          <div className="text-lg font-semibold text-gray-900">{stats.uniqueBidders}</div>
          <div className="text-xs text-gray-500">Bidders</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center w-8 h-8 bg-red-100 rounded-lg mx-auto mb-2">
            <Clock className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-lg font-semibold text-gray-900">
            {Math.floor(stats.timeRemaining / (1000 * 60 * 60))}h
          </div>
          <div className="text-xs text-gray-500">Remaining</div>
        </div>
      </div>

      {/* Chart Container */}
      <div className="relative h-80">
        <Line ref={chartRef} data={chartData} options={options} />
        
        {/* Bid History Overlay */}
        {showBidHistory && (
          <div className="absolute top-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-64 z-10">
            <h4 className="font-semibold text-gray-900 mb-3">Recent Bids</h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {bidHistory.slice(-5).reverse().map((bid) => (
                <div key={bid.id} className="flex items-center justify-between text-sm">
                  <div>
                    <div className="font-medium text-gray-900">${bid.amount.toLocaleString()}</div>
                    <div className="text-gray-500 text-xs">{bid.bidder}</div>
                  </div>
                  <div className="text-xs text-gray-400">
                    {bid.timestamp.toLocaleTimeString()}
                  </div>
                  {bid.isWinning && (
                    <div className="text-amber-500 text-xs">🏆</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Chart Footer */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Hover over the chart to see bid details</span>
          <span className="flex items-center">
            <div className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></div>
            Live bidding data
          </span>
        </div>
      </div>
    </div>
  );
};

export default BidChart;
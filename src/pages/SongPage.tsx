import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Play, Pause, Heart, Share2, Clock, DollarSign, Users, Music, Eye, AlertCircle } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Progress } from '../components/ui/progress'
import { Separator } from '../components/ui/separator'
import { Alert, AlertDescription } from '../components/ui/alert'
import BidChart from '../components/charts/BidChart'

// Mock bid history data
const mockBidHistory = [
  { time: '10:00', price: 800 },
  { time: '10:15', price: 850 },
  { time: '10:30', price: 900 },
  { time: '10:45', price: 950 },
  { time: '11:00', price: 1000 },
  { time: '11:15', price: 1100 },
  { time: '11:30', price: 1200 },
  { time: '11:45', price: 1250 },
]

// Mock song data
const mockSong = {
  id: '1',
  title: 'Midnight Dreams',
  genre: 'Electronic',
  mood: 'Energetic',
  duration: '3:24',
  currentBid: 1250,
  minBid: 1300,
  timeLeft: 8100, // seconds
  language: 'English',
  bids: 23,
  views: 1847,
  description: 'A captivating electronic track perfect for modern media projects. Features dynamic beats and atmospheric synths.',
  tags: ['Electronic', 'Energetic', 'Modern', 'Commercial'],
  license: 'Commercial Use',
  format: 'WAV, MP3',
  bpm: 128,
  key: 'C Minor',
  image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop'
}

export default function SongPage() {
  const { id } = useParams()
  const [bidAmount, setBidAmount] = useState('')
  const [timeLeft, setTimeLeft] = useState(mockSong.timeLeft)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showBidHistory, setShowBidHistory] = useState(false)

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours}h ${minutes}m ${secs}s`
  }

  const handleBidSubmit = () => {
    if (parseFloat(bidAmount) >= mockSong.minBid) {
      // Handle bid submission
      console.log('Bid submitted:', bidAmount)
      setBidAmount('')
    }
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Button variant="ghost" asChild className="mb-6">
        <Link to="/catalog">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Catalog
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - Bid Chart (2/3 width) */}
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">{mockSong.title}</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <Badge variant="secondary">{mockSong.genre}</Badge>
                <span className="flex items-center">
                  <Music className="h-3 w-3 mr-1" />
                  {mockSong.duration}
                </span>
                <span className="flex items-center">
                  <Eye className="h-3 w-3 mr-1" />
                  {mockSong.views} views
                </span>
                <span className="flex items-center">
                  <Users className="h-3 w-3 mr-1" />
                  {mockSong.bids} bids
                </span>
              </div>
            </CardHeader>
            <CardContent>
              {/* Audio Player */}
              <div className="mb-6">
                <img
                  src={mockSong.image}
                  alt={mockSong.title}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? (
                      <Pause className="h-4 w-4 mr-2" />
                    ) : (
                      <Play className="h-4 w-4 mr-2" />
                    )}
                    {isPlaying ? 'Pause' : 'Play'} Preview
                  </Button>
                  <Progress value={33} className="flex-1" />
                  <span className="text-sm text-muted-foreground">1:12 / 3:24</span>
                </div>
              </div>

              {/* Advanced Bid Chart */}
              <div className="h-96">
                <BidChart
                  songId={id || '1'}
                  currentBid={mockSong.currentBid}
                  startingBid={800}
                  endTime={new Date(Date.now() + timeLeft * 1000)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Bidding Section */}
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                <div>
                  <Label htmlFor="bid-amount">Your Bid Amount</Label>
                  <div className="relative mt-2">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="bid-amount"
                      type="number"
                      placeholder={mockSong.minBid.toString()}
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Minimum bid: ${mockSong.minBid}
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Current Highest Bid</p>
                  <p className="text-3xl font-bold text-primary">${mockSong.currentBid}</p>
                </div>

                <Button 
                  onClick={handleBidSubmit}
                  disabled={!bidAmount || parseFloat(bidAmount) < mockSong.minBid}
                  className="w-full"
                  size="lg"
                >
                  Place Bid
                </Button>
              </div>

              {/* Timer */}
              <div className="mt-6 p-4 bg-accent/10 rounded-lg">
                <div className="flex items-center justify-center gap-2 text-center">
                  <Clock className="h-5 w-5 text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground">Auction ends in</p>
                    <p className="text-2xl font-bold text-accent">{formatTime(timeLeft)}</p>
                  </div>
                </div>
              </div>

              {timeLeft < 3600 && (
                <Alert className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    This auction is ending soon! Place your bid now to avoid missing out.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Song Info (1/3 width) */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Song Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-sm text-muted-foreground">{mockSong.description}</p>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Genre</p>
                  <p className="font-medium">{mockSong.genre}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Mood</p>
                  <p className="font-medium">{mockSong.mood}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Duration</p>
                  <p className="font-medium">{mockSong.duration}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Language</p>
                  <p className="font-medium">{mockSong.language}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">BPM</p>
                  <p className="font-medium">{mockSong.bpm}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Key</p>
                  <p className="font-medium">{mockSong.key}</p>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-2">License & Format</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">License:</span>
                    <span className="font-medium">{mockSong.license}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Format:</span>
                    <span className="font-medium">{mockSong.format}</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {mockSong.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="text-center pt-4">
                <Button variant="outline" className="w-full">
                  Contact Seller
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
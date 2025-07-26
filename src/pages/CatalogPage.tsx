import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Search, Filter, Play, Clock, DollarSign, Music, Heart, Eye } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent, CardHeader } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Slider } from '../components/ui/slider'
import { Checkbox } from '../components/ui/checkbox'
import { Label } from '../components/ui/label'
import { Separator } from '../components/ui/separator'

// Mock data for songs
const mockSongs = [
  {
    id: '1',
    title: 'Midnight Dreams',
    genre: 'Electronic',
    mood: 'Energetic',
    duration: '3:24',
    currentBid: 1250,
    timeLeft: '2h 15m',
    language: 'English',
    bids: 23,
    views: 1847,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop'
  },
  {
    id: '2',
    title: 'Ocean Waves',
    genre: 'Ambient',
    mood: 'Calm',
    duration: '4:12',
    currentBid: 890,
    timeLeft: '5h 42m',
    language: 'Instrumental',
    bids: 15,
    views: 923,
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop'
  },
  {
    id: '3',
    title: 'Urban Rhythm',
    genre: 'Hip Hop',
    mood: 'Aggressive',
    duration: '2:58',
    currentBid: 2100,
    timeLeft: '1h 8m',
    language: 'English',
    bids: 41,
    views: 3241,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop'
  },
  {
    id: '4',
    title: 'Classical Sunrise',
    genre: 'Classical',
    mood: 'Peaceful',
    duration: '5:33',
    currentBid: 1680,
    timeLeft: '3h 27m',
    language: 'Instrumental',
    bids: 28,
    views: 1456,
    image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400&h=400&fit=crop'
  },
  {
    id: '5',
    title: 'Rock Anthem',
    genre: 'Rock',
    mood: 'Energetic',
    duration: '3:45',
    currentBid: 1950,
    timeLeft: '4h 12m',
    language: 'English',
    bids: 35,
    views: 2187,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop'
  },
  {
    id: '6',
    title: 'Jazz Evening',
    genre: 'Jazz',
    mood: 'Smooth',
    duration: '4:21',
    currentBid: 1320,
    timeLeft: '6h 55m',
    language: 'Instrumental',
    bids: 19,
    views: 1123,
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop'
  }
]

const genres = ['All', 'Electronic', 'Ambient', 'Hip Hop', 'Classical', 'Rock', 'Jazz', 'Pop', 'Country']
const moods = ['All', 'Energetic', 'Calm', 'Aggressive', 'Peaceful', 'Smooth', 'Uplifting', 'Dark']
const languages = ['All', 'English', 'Spanish', 'French', 'German', 'Instrumental']

export default function CatalogPage() {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('All')
  const [selectedMood, setSelectedMood] = useState('All')
  const [selectedLanguage, setSelectedLanguage] = useState('All')
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [durationRange, setDurationRange] = useState([0, 600]) // in seconds
  const [sortBy, setSortBy] = useState('price-asc')
  const [showFilters, setShowFilters] = useState(false)

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const formatTimeLeft = (timeLeft: string) => {
    return timeLeft
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">{t('catalog.title')}</h1>
        <p className="text-muted-foreground">Discover and bid on premium music content</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-80">
          <div className="sticky top-24">
            <div className="flex items-center justify-between mb-4 lg:hidden">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                {showFilters ? 'Hide' : 'Show'} Filters
              </Button>
            </div>

            <Card className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
              <CardHeader>
                <h2 className="text-lg font-semibold hidden lg:block">Filters</h2>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div>
                  <Label htmlFor="search">Search</Label>
                  <div className="relative mt-2">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder={t('catalog.search')}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <Separator />

                {/* Genre */}
                <div>
                  <Label>{t('catalog.filters.genre')}</Label>
                  <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {genres.map((genre) => (
                        <SelectItem key={genre} value={genre}>
                          {genre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Mood */}
                <div>
                  <Label>{t('catalog.filters.mood')}</Label>
                  <Select value={selectedMood} onValueChange={setSelectedMood}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {moods.map((mood) => (
                        <SelectItem key={mood} value={mood}>
                          {mood}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Language */}
                <div>
                  <Label>{t('catalog.filters.language')}</Label>
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((language) => (
                        <SelectItem key={language} value={language}>
                          {language}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Price Range */}
                <div>
                  <Label>Price Range: ${priceRange[0]} - ${priceRange[1]}</Label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={5000}
                    step={50}
                    className="mt-3"
                  />
                </div>

                {/* Duration Range */}
                <div>
                  <Label>Duration: {formatDuration(durationRange[0])} - {formatDuration(durationRange[1])}</Label>
                  <Slider
                    value={durationRange}
                    onValueChange={setDurationRange}
                    max={600}
                    step={15}
                    className="mt-3"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Sort and Results Count */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <p className="text-muted-foreground">
              Showing {mockSongs.length} results
            </p>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="time-asc">Ending Soon</SelectItem>
                <SelectItem value="popularity">Most Popular</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Song Grid */}
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {mockSongs.map((song) => (
              <Card key={song.id} className="group hover:shadow-lg transition-all duration-200 overflow-hidden">
                <div className="relative">
                  <img
                    src={song.image}
                    alt={song.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <Button size="sm" variant="secondary" className="rounded-full">
                      <Play className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Button size="sm" variant="ghost" className="rounded-full bg-black/20 hover:bg-black/40 text-white">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg leading-tight">{song.title}</h3>
                    <Badge variant="secondary" className="ml-2 shrink-0">
                      {song.genre}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center">
                      <Music className="h-3 w-3 mr-1" />
                      {song.duration}
                    </div>
                    <div className="flex items-center">
                      <Eye className="h-3 w-3 mr-1" />
                      {song.views}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-sm text-muted-foreground">{t('catalog.card.currentBid')}</p>
                      <p className="text-xl font-bold text-primary">${song.currentBid}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">{t('catalog.card.timeLeft')}</p>
                      <p className="text-sm font-medium flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {song.timeLeft}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {song.mood}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {song.language}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {song.bids} bids
                    </p>
                  </div>

                  <Button asChild className="w-full mt-4">
                    <Link to={`/song/${song.id}`}>
                      View Auction
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
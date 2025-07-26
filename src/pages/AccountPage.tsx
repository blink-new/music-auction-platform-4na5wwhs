import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { User, Settings, Gavel, ShoppingBag, Star, Shield, Bell, Lock, Globe } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Switch } from '../components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Separator } from '../components/ui/separator'

export default function AccountPage() {
  const [searchParams] = useSearchParams()
  const defaultTab = searchParams.get('tab') || 'bids'
  const [activeTab, setActiveTab] = useState(defaultTab)

  const userStats = {
    rating: 4.8,
    totalBids: 127,
    wonAuctions: 23,
    activeLots: 5,
    escrowStatus: false
  }

  const mockBids = [
    {
      id: '1',
      songTitle: 'Midnight Dreams',
      currentBid: 1250,
      myBid: 1200,
      status: 'active',
      timeLeft: '2h 15m'
    },
    {
      id: '2',
      songTitle: 'Ocean Waves',
      currentBid: 890,
      myBid: 850,
      status: 'outbid',
      timeLeft: '5h 42m'
    }
  ]

  const mockPurchases = [
    {
      id: '1',
      songTitle: 'Urban Rhythm',
      finalPrice: 2100,
      purchaseDate: '2024-01-15',
      status: 'completed'
    },
    {
      id: '2',
      songTitle: 'Classical Sunrise',
      finalPrice: 1680,
      purchaseDate: '2024-01-10',
      status: 'completed'
    }
  ]

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">John Doe</h1>
            <p className="text-muted-foreground">Member since January 2024</p>
          </div>
        </div>

        {/* User Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Star className="h-5 w-5 text-yellow-500 mr-1" />
                <span className="text-2xl font-bold">{userStats.rating}</span>
              </div>
              <p className="text-sm text-muted-foreground">Rating</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{userStats.totalBids}</div>
              <p className="text-sm text-muted-foreground">Total Bids</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{userStats.wonAuctions}</div>
              <p className="text-sm text-muted-foreground">Won Auctions</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-accent">{userStats.activeLots}</div>
              <p className="text-sm text-muted-foreground">Active Lots</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Shield className={`h-5 w-5 mr-1 ${userStats.escrowStatus ? 'text-yellow-500' : 'text-green-600'}`} />
                <span className="text-sm font-medium">
                  {userStats.escrowStatus ? 'Escrow' : 'Verified'}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">Status</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="bids" className="flex items-center gap-2">
            <Gavel className="h-4 w-4" />
            My Bids
          </TabsTrigger>
          <TabsTrigger value="purchases" className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4" />
            Purchases
          </TabsTrigger>
          <TabsTrigger value="lots" className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            My Lots
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="bids" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>My Active Bids</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockBids.map((bid) => (
                  <div key={bid.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">{bid.songTitle}</h3>
                      <p className="text-sm text-muted-foreground">
                        My bid: ${bid.myBid} | Current: ${bid.currentBid}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge variant={bid.status === 'active' ? 'default' : 'destructive'}>
                        {bid.status}
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-1">{bid.timeLeft}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="purchases" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Purchase History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockPurchases.map((purchase) => (
                  <div key={purchase.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">{purchase.songTitle}</h3>
                      <p className="text-sm text-muted-foreground">
                        Purchased on {purchase.purchaseDate}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary">${purchase.finalPrice}</p>
                      <Badge variant="outline">{purchase.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lots" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>My Lots</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No active lots</p>
                <Button className="mt-4">Create New Lot</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <div className="grid gap-6">
            {/* Profile Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john.doe@example.com" />
                </div>
                <Button>Update Profile</Button>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
                <Button>Change Password</Button>
              </CardContent>
            </Card>

            {/* Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="language">Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ru">Русский</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                      <SelectItem value="zh">中文</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    Notifications
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="emailNotifications">Email Notifications</Label>
                      <Switch id="emailNotifications" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="bidUpdates">Bid Updates</Label>
                      <Switch id="bidUpdates" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="auctionReminders">Auction Reminders</Label>
                      <Switch id="auctionReminders" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="marketingEmails">Marketing Emails</Label>
                      <Switch id="marketingEmails" />
                    </div>
                  </div>
                </div>

                <Button>Save Preferences</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
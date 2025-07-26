import { useState } from 'react'
import { Users, Shield, AlertTriangle, BarChart3, Settings, Search, Filter } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'

const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    status: 'active',
    rating: 4.8,
    totalBids: 127,
    joinDate: '2024-01-15',
    escrowStatus: false
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    status: 'escrow',
    rating: 3.2,
    totalBids: 45,
    joinDate: '2024-02-03',
    escrowStatus: true
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    status: 'banned',
    rating: 2.1,
    totalBids: 23,
    joinDate: '2024-01-28',
    escrowStatus: false
  }
]

const mockAuctions = [
  {
    id: '1',
    title: 'Midnight Dreams',
    seller: 'John Doe',
    currentBid: 1250,
    bids: 23,
    timeLeft: '2h 15m',
    status: 'active'
  },
  {
    id: '2',
    title: 'Ocean Waves',
    seller: 'Jane Smith',
    currentBid: 890,
    bids: 15,
    timeLeft: '5h 42m',
    status: 'active'
  },
  {
    id: '3',
    title: 'Urban Rhythm',
    seller: 'Mike Johnson',
    currentBid: 2100,
    bids: 41,
    timeLeft: 'Ended',
    status: 'completed'
  }
]

const mockReports = [
  {
    id: '1',
    type: 'suspicious_bidding',
    reporter: 'John Doe',
    reported: 'Jane Smith',
    auction: 'Midnight Dreams',
    reason: 'Unusual bidding pattern detected',
    status: 'pending',
    date: '2024-01-20'
  },
  {
    id: '2',
    type: 'content_violation',
    reporter: 'Mike Johnson',
    reported: 'John Doe',
    auction: 'Ocean Waves',
    reason: 'Inappropriate content in song description',
    status: 'resolved',
    date: '2024-01-19'
  }
]

export default function AdminPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [userFilter, setUserFilter] = useState('all')
  const [auctionFilter, setAuctionFilter] = useState('all')

  const stats = {
    totalUsers: 8521,
    activeAuctions: 2847,
    pendingReports: 12,
    escrowUsers: 45
  }

  const handleUserAction = (userId: string, action: string) => {
    console.log(`${action} user ${userId}`)
    // Handle user actions (ban, escrow, etc.)
  }

  const handleReportAction = (reportId: string, action: string) => {
    console.log(`${action} report ${reportId}`)
    // Handle report actions
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Admin Panel</h1>
        <p className="text-muted-foreground">Manage users, auctions, and platform security</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Total Users</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <BarChart3 className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">{stats.activeAuctions.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Active Auctions</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <AlertTriangle className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{stats.pendingReports}</div>
            <p className="text-sm text-muted-foreground">Pending Reports</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Shield className="h-8 w-8 text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{stats.escrowUsers}</div>
            <p className="text-sm text-muted-foreground">Escrow Users</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="auctions">Auction Monitoring</TabsTrigger>
          <TabsTrigger value="reports">Reports & Moderation</TabsTrigger>
          <TabsTrigger value="settings">System Settings</TabsTrigger>
        </TabsList>

        {/* User Management */}
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={userFilter} onValueChange={setUserFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="escrow">Escrow</SelectItem>
                    <SelectItem value="banned">Banned</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Total Bids</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            user.status === 'active' ? 'default' :
                            user.status === 'escrow' ? 'secondary' : 'destructive'
                          }
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.rating}</TableCell>
                      <TableCell>{user.totalBids}</TableCell>
                      <TableCell>{user.joinDate}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {user.status === 'active' && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleUserAction(user.id, 'escrow')}
                              >
                                Escrow
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleUserAction(user.id, 'ban')}
                              >
                                Ban
                              </Button>
                            </>
                          )}
                          {user.status === 'escrow' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleUserAction(user.id, 'activate')}
                            >
                              Activate
                            </Button>
                          )}
                          {user.status === 'banned' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleUserAction(user.id, 'unban')}
                            >
                              Unban
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Auction Monitoring */}
        <TabsContent value="auctions">
          <Card>
            <CardHeader>
              <CardTitle>Auction Monitoring</CardTitle>
              <Select value={auctionFilter} onValueChange={setAuctionFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Auctions</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="flagged">Flagged</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Auction</TableHead>
                    <TableHead>Seller</TableHead>
                    <TableHead>Current Bid</TableHead>
                    <TableHead>Bids</TableHead>
                    <TableHead>Time Left</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAuctions.map((auction) => (
                    <TableRow key={auction.id}>
                      <TableCell className="font-medium">{auction.title}</TableCell>
                      <TableCell>{auction.seller}</TableCell>
                      <TableCell>${auction.currentBid}</TableCell>
                      <TableCell>{auction.bids}</TableCell>
                      <TableCell>{auction.timeLeft}</TableCell>
                      <TableCell>
                        <Badge variant={auction.status === 'active' ? 'default' : 'secondary'}>
                          {auction.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            View
                          </Button>
                          <Button size="sm" variant="destructive">
                            Flag
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports & Moderation */}
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Reports & Moderation</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Reporter</TableHead>
                    <TableHead>Reported User</TableHead>
                    <TableHead>Auction</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>
                        <Badge variant="outline">{report.type.replace('_', ' ')}</Badge>
                      </TableCell>
                      <TableCell>{report.reporter}</TableCell>
                      <TableCell>{report.reported}</TableCell>
                      <TableCell>{report.auction}</TableCell>
                      <TableCell className="max-w-xs truncate">{report.reason}</TableCell>
                      <TableCell>
                        <Badge variant={report.status === 'pending' ? 'destructive' : 'default'}>
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {report.status === 'pending' && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleReportAction(report.id, 'resolve')}
                              >
                                Resolve
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleReportAction(report.id, 'escalate')}
                              >
                                Escalate
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Settings */}
        <TabsContent value="settings">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Platform Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  System configuration and platform-wide settings will be available here.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Configure fraud detection, escrow thresholds, and security parameters.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
import { useState } from 'react'
import { Bell, Check, X, Clock, DollarSign, Gavel, Star } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'

const mockNotifications = [
  {
    id: '1',
    type: 'bid_outbid',
    title: 'You\'ve been outbid',
    message: 'Someone placed a higher bid on "Midnight Dreams". Current bid: $1,350',
    time: '2 minutes ago',
    read: false,
    icon: Gavel,
    actionUrl: '/song/1'
  },
  {
    id: '2',
    type: 'auction_ending',
    title: 'Auction ending soon',
    message: 'The auction for "Ocean Waves" ends in 30 minutes. You\'re currently winning!',
    time: '15 minutes ago',
    read: false,
    icon: Clock,
    actionUrl: '/song/2'
  },
  {
    id: '3',
    type: 'auction_won',
    title: 'Congratulations! You won',
    message: 'You won the auction for "Urban Rhythm" with a bid of $2,100',
    time: '1 hour ago',
    read: true,
    icon: Star,
    actionUrl: '/account?tab=purchases'
  },
  {
    id: '4',
    type: 'payment_received',
    title: 'Payment received',
    message: 'Payment of $1,680 received for "Classical Sunrise"',
    time: '3 hours ago',
    read: true,
    icon: DollarSign,
    actionUrl: '/account?tab=purchases'
  },
  {
    id: '5',
    type: 'new_bid',
    title: 'New bid on your lot',
    message: 'Someone placed a bid of $950 on your song "Jazz Evening"',
    time: '5 hours ago',
    read: true,
    icon: Gavel,
    actionUrl: '/song/6'
  }
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [filter, setFilter] = useState('all')

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    )
  }

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id))
  }

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return !notif.read
    if (filter === 'read') return notif.read
    return true
  })

  const unreadCount = notifications.filter(notif => !notif.read).length

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'bid_outbid':
        return 'text-red-500'
      case 'auction_ending':
        return 'text-yellow-500'
      case 'auction_won':
        return 'text-green-500'
      case 'payment_received':
        return 'text-blue-500'
      case 'new_bid':
        return 'text-purple-500'
      default:
        return 'text-muted-foreground'
    }
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Notifications</h1>
          <p className="text-muted-foreground">
            Stay updated with your auction activity
            {unreadCount > 0 && (
              <Badge className="ml-2">{unreadCount} unread</Badge>
            )}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button onClick={markAllAsRead} variant="outline">
            <Check className="h-4 w-4 mr-2" />
            Mark all as read
          </Button>
        )}
      </div>

      {/* Filter Tabs */}
      <Tabs value={filter} onValueChange={setFilter} className="mb-6">
        <TabsList>
          <TabsTrigger value="all">
            All ({notifications.length})
          </TabsTrigger>
          <TabsTrigger value="unread">
            Unread ({unreadCount})
          </TabsTrigger>
          <TabsTrigger value="read">
            Read ({notifications.length - unreadCount})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className="mt-6">
          {filteredNotifications.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No notifications</h3>
                <p className="text-muted-foreground">
                  {filter === 'unread' 
                    ? "You're all caught up! No unread notifications."
                    : filter === 'read'
                    ? "No read notifications to show."
                    : "You don't have any notifications yet."
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredNotifications.map((notification) => (
                <Card 
                  key={notification.id} 
                  className={`transition-all duration-200 hover:shadow-md ${
                    !notification.read ? 'border-primary/50 bg-primary/5' : ''
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className={`flex-shrink-0 ${getNotificationColor(notification.type)}`}>
                        <notification.icon className="h-5 w-5" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className={`font-semibold ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {notification.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {notification.time}
                            </p>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2 flex-shrink-0">
                            {!notification.read && (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => markAsRead(notification.id)}
                                className="h-8 w-8 p-0"
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => deleteNotification(notification.id)}
                              className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Action Button */}
                        {notification.actionUrl && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="mt-3"
                            onClick={() => {
                              markAsRead(notification.id)
                              // Navigate to actionUrl
                              window.location.href = notification.actionUrl
                            }}
                          >
                            View Details
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Settings Card */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Manage your notification preferences in your account settings.
          </p>
          <Button variant="outline" asChild>
            <a href="/account?tab=settings">
              Go to Settings
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
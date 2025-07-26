import { Music, Shield, Users, Zap, CheckCircle, ArrowRight } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Link } from 'react-router-dom'

export default function AboutPage() {
  const steps = [
    {
      step: 1,
      title: 'Browse & Discover',
      description: 'Explore our curated catalog of premium music content from talented creators worldwide.',
      icon: Music
    },
    {
      step: 2,
      title: 'Place Your Bid',
      description: 'Found something you love? Place competitive bids in real-time auctions with transparent pricing.',
      icon: Zap
    },
    {
      step: 3,
      title: 'Secure Transaction',
      description: 'Win the auction and complete your purchase through our secure escrow system.',
      icon: Shield
    },
    {
      step: 4,
      title: 'License & Use',
      description: 'Receive full commercial licensing rights and high-quality files for your projects.',
      icon: CheckCircle
    }
  ]

  const features = [
    {
      title: 'Real-time Auctions',
      description: 'Experience live bidding with instant updates and interactive charts showing bid history.',
      icon: Zap
    },
    {
      title: 'Secure Escrow System',
      description: 'All transactions are protected by our advanced escrow system with fraud detection.',
      icon: Shield
    },
    {
      title: 'Global Community',
      description: 'Connect with music creators, labels, and buyers from around the world.',
      icon: Users
    },
    {
      title: 'Rights Protection',
      description: 'Complete licensing verification ensures you get legitimate commercial usage rights.',
      icon: CheckCircle
    }
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              About MusicAuction
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">
              We're revolutionizing how music content is bought, sold, and licensed through 
              secure auction technology and transparent marketplace dynamics.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-muted-foreground">
              To create a fair, transparent, and secure marketplace where music creators can 
              monetize their work effectively while buyers gain access to premium content 
              with complete rights protection.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-0 shadow-sm">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Getting started is simple. Follow these four easy steps to begin buying or selling music.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="h-full">
                  <CardHeader className="text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold mb-4">
                      {step.step}
                    </div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
                
                {/* Arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Trusted by Thousands
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Join a growing community of music professionals who trust our platform.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">15,392</div>
              <div className="text-sm text-muted-foreground">Songs Sold</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">8,521</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">$2.4M</div>
              <div className="text-sm text-muted-foreground">Total Sales</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">94%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-primary-foreground sm:text-4xl mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8">
              Join thousands of music professionals already using our platform to buy and sell premium music content.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
                <Link to="/catalog">Browse Catalog</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Link to="/account">Create Account</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h3 className="text-2xl font-bold text-center mb-8">Contact Information</h3>
            <div className="grid gap-8 md:grid-cols-3 text-center">
              <div>
                <h4 className="font-semibold mb-2">General Inquiries</h4>
                <p className="text-muted-foreground">info@musicauction.com</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Support</h4>
                <p className="text-muted-foreground">support@musicauction.com</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Business</h4>
                <p className="text-muted-foreground">business@musicauction.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
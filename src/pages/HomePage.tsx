import { Link } from 'react-router-dom'
import { ArrowRight, Music, Play, Shield, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'

export default function HomePage() {
  const { t } = useTranslation()
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Welcome Banner */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 ring-4 ring-primary/5">
                <Music className="h-10 w-10 text-primary" />
              </div>
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl mb-6">
              {t('home.hero.title')}
            </h1>
            
            <p className="text-lg leading-8 text-muted-foreground sm:text-xl mb-8 max-w-2xl mx-auto">
              {t('home.hero.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link to="/catalog">
                  {t('home.hero.cta')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <Link to="/about">{t('home.hero.secondary_cta')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Jump Sections */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
              Quick Access
            </h2>
            <p className="text-lg text-muted-foreground">
              Jump directly to the sections you need
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            {/* Catalog Section */}
            <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
              <Link to="/catalog" className="block">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors mb-4">
                    <Play className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Catalog</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription>
                    Browse our extensive collection of music from talented artists worldwide. Find the perfect track for your project.
                  </CardDescription>
                  <Button variant="ghost" className="mt-4 group-hover:bg-primary/10">
                    Explore Music
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Link>
            </Card>

            {/* About Project Section */}
            <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
              <Link to="/about" className="block">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 group-hover:bg-accent/20 transition-colors mb-4">
                    <Shield className="h-8 w-8 text-accent" />
                  </div>
                  <CardTitle className="text-xl">About the Project</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription>
                    Learn about our mission to revolutionize music licensing through secure auctions and transparent transactions.
                  </CardDescription>
                  <Button variant="ghost" className="mt-4 group-hover:bg-accent/10">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Link>
            </Card>

            {/* How It Works Section */}
            <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
              <Link to="/about#how-it-works" className="block">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 group-hover:bg-green-500/20 transition-colors mb-4">
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-xl">How It Works</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription>
                    Discover the simple 3-step process: Browse catalog, place bids, and secure your music license safely.
                  </CardDescription>
                  <Button variant="ghost" className="mt-4 group-hover:bg-green-500/10">
                    See Process
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Login and Registration CTA */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join our community of music professionals and start discovering amazing content today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="w-full sm:w-auto">
                Register Now
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Login
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
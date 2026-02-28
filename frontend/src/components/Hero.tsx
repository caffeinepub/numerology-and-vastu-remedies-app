import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Compass, Calendar, Star } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

export default function Hero({ onGetStarted }: HeroProps) {
  return (
    <div className="relative">
      {/* Hero Banner Section */}
      <div className="relative h-[400px] overflow-hidden">
        <img
          src="/assets/generated/hero-banner.dim_1200x400.jpg"
          alt="Numerology and Vastu"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Unlock Your Destiny
              </h1>
              <p className="text-xl md:text-2xl text-foreground/90 mb-8">
                Discover the ancient wisdom of Numerology and Vastu with Ankit
              </p>
              <Button
                size="lg"
                onClick={onGetStarted}
                className="text-lg px-8 py-6 bg-gradient-to-r from-primary via-accent to-secondary hover:opacity-90 transition-opacity"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Get Your Reading
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="flex flex-col items-center text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-primary/20 shadow-lg">
                <img
                  src="/assets/generated/ankit-portrait.dim_400x400.jpg"
                  alt="Ankit"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-2xl font-bold mb-2">Meet Ankit</h2>
              <p className="text-muted-foreground">
                Expert Numerologist & Vastu Consultant with over 10 years of experience
                helping people discover their true potential and harmonize their living spaces.
              </p>
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-4">The Science of Numbers</h3>
              <p className="text-muted-foreground mb-4">
                Numerology is an ancient metaphysical science that reveals the hidden meanings
                behind numbers in your life. Your name and birth date hold powerful vibrations
                that influence your personality, relationships, and destiny.
              </p>
              <p className="text-muted-foreground">
                Combined with Vastu Shastra, the ancient Indian science of architecture and
                spatial harmony, you can align your environment with cosmic energies for
                prosperity and well-being.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Birth Chart Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Detailed insights into your life path, personality traits, and karmic patterns
                  based on your birth date.
                </p>
              </CardContent>
            </Card>

            <Card className="border-accent/20 hover:border-accent/40 transition-colors">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Lucky Numbers & Colors</h3>
                <p className="text-sm text-muted-foreground">
                  Discover your personal lucky numbers and favorable colors to enhance
                  positive energy in your life.
                </p>
              </CardContent>
            </Card>

            <Card className="border-secondary/20 hover:border-secondary/40 transition-colors">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                  <Compass className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Vastu Remedies</h3>
                <p className="text-sm text-muted-foreground">
                  Personalized Vastu guidance tailored to your numerological profile for
                  harmonious living spaces.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

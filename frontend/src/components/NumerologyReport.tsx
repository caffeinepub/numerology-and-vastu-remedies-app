import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Star, Heart, Briefcase, Palette, TrendingUp, Compass, Calendar } from 'lucide-react';
import type { NumerologyReport as NumerologyReportType } from '../backend';

interface NumerologyReportProps {
  report: NumerologyReportType;
  onNavigateToVastu?: () => void;
  onBookConsultation?: () => void;
  hasVastu?: boolean;
}

export default function NumerologyReport({ report, onNavigateToVastu, onBookConsultation, hasVastu }: NumerologyReportProps) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Your Numerology Report
          </h1>
          <p className="text-xl text-muted-foreground">
            {report.userName} • Born {report.birthDate}
          </p>
        </div>

        {/* Life Path Number */}
        <Card className="border-primary/20 shadow-lg">
          <CardHeader className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary via-accent to-secondary flex items-center justify-center">
              <span className="text-5xl font-bold text-primary-foreground">
                {Number(report.lifePathNumber)}
              </span>
            </div>
            <CardTitle className="text-2xl">Life Path Number</CardTitle>
            <CardDescription>Your core numerological vibration</CardDescription>
          </CardHeader>
        </Card>

        {/* Birth Chart Analysis */}
        <Card className="border-accent/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Star className="w-6 h-6 text-accent" />
              <CardTitle>Birth Chart Analysis</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <img
                src="/assets/generated/numerology-chart.dim_800x600.jpg"
                alt="Numerology Chart"
                className="w-full rounded-lg"
              />
            </div>
            <p className="text-foreground leading-relaxed">{report.birthChartAnalysis}</p>
          </CardContent>
        </Card>

        {/* Lucky Numbers */}
        <Card className="border-primary/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-primary" />
              <CardTitle>Your Lucky Numbers</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {report.luckyNumbers.map((num, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-2xl px-6 py-3 border-primary/40 bg-primary/5"
                >
                  {Number(num)}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Favorable Colors */}
        <Card className="border-secondary/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Palette className="w-6 h-6 text-secondary" />
              <CardTitle>Favorable Colors</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {report.favorableColors.map((color, index) => (
                <Badge
                  key={index}
                  className="text-base px-4 py-2 bg-gradient-to-r from-primary/80 to-accent/80"
                >
                  {color}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Incorporate these colors in your wardrobe, home decor, and surroundings to
              enhance positive energy.
            </p>
          </CardContent>
        </Card>

        {/* Career Recommendations */}
        <Card className="border-accent/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-accent" />
              <CardTitle>Best Career Options</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {report.careerRecommendations.map((career, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2" />
                  <span className="text-foreground">{career}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Relationship Guidance */}
        <Card className="border-secondary/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-secondary" />
              <CardTitle>Relationship Guidance</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-foreground leading-relaxed">{report.relationshipGuidance}</p>
          </CardContent>
        </Card>

        <Separator className="my-8" />

        {/* Navigation Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {hasVastu && onNavigateToVastu && (
            <Button
              size="lg"
              onClick={onNavigateToVastu}
              className="bg-gradient-to-r from-accent via-secondary to-primary hover:opacity-90 transition-opacity"
            >
              <Compass className="mr-2 h-5 w-5" />
              View Vastu Remedies
            </Button>
          )}
          {onBookConsultation && (
            <Button
              size="lg"
              variant="outline"
              onClick={onBookConsultation}
              className="border-primary/40 hover:bg-primary/10"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Book Consultation with Ankit
            </Button>
          )}
        </div>

        <div className="text-center text-muted-foreground">
          <p>
            Want deeper insights? Book a personal consultation with Ankit for a comprehensive
            analysis.
          </p>
        </div>
      </div>
    </div>
  );
}

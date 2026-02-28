import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Compass, Navigation, Lightbulb, FileText, Calendar } from 'lucide-react';
import type { VastuRemedy } from '../backend';

interface VastuRemediesProps {
  remedy: VastuRemedy;
  onNavigateToReport?: () => void;
  onBookConsultation?: () => void;
}

export default function VastuRemedies({ remedy, onNavigateToReport, onBookConsultation }: VastuRemediesProps) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Your Vastu Remedies
          </h1>
          <p className="text-xl text-muted-foreground">
            Personalized for {remedy.userName} • Life Path {Number(remedy.numerologyNumber)}
          </p>
        </div>

        {/* Vastu Compass */}
        <Card className="border-primary/20 shadow-lg">
          <CardHeader className="text-center">
            <div className="w-48 h-48 mx-auto mb-4">
              <img
                src="/assets/generated/vastu-compass.dim_300x300.jpg"
                alt="Vastu Compass"
                className="w-full h-full object-contain"
              />
            </div>
            <CardTitle className="text-2xl">Vastu Shastra Guidance</CardTitle>
            <CardDescription>
              Ancient wisdom for harmonizing your living space with cosmic energies
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Preferred Directions */}
        <Card className="border-accent/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Navigation className="w-6 h-6 text-accent" />
              <CardTitle>Preferred Directions</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3 mb-4">
              {remedy.preferredDirections.map((direction, index) => (
                <Badge
                  key={index}
                  className="text-base px-4 py-2 bg-gradient-to-r from-accent/80 to-secondary/80"
                >
                  <Compass className="w-4 h-4 mr-2" />
                  {direction}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              These directions are most favorable for you based on your numerological profile.
              Consider placing your bed, desk, or meditation space facing these directions.
            </p>
          </CardContent>
        </Card>

        {/* Vastu Suggestions */}
        <Card className="border-secondary/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-secondary" />
              <CardTitle>Vastu Suggestions</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {remedy.vastuSuggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start gap-3 p-4 rounded-lg bg-muted/30">
                  <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sm font-semibold text-secondary">{index + 1}</span>
                  </div>
                  <span className="text-foreground">{suggestion}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Remedy Instructions */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Implementation Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground leading-relaxed mb-4">{remedy.remedyInstructions}</p>
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
              <p className="text-sm text-foreground">
                <strong>Note:</strong> Vastu remedies work best when implemented gradually and
                with positive intention. Start with small changes and observe the energy shifts
                in your space.
              </p>
            </div>
          </CardContent>
        </Card>

        <Separator className="my-8" />

        {/* Navigation Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {onNavigateToReport && (
            <Button
              size="lg"
              variant="outline"
              onClick={onNavigateToReport}
              className="border-primary/40 hover:bg-primary/10"
            >
              <FileText className="mr-2 h-5 w-5" />
              Back to Numerology Report
            </Button>
          )}
          {onBookConsultation && (
            <Button
              size="lg"
              onClick={onBookConsultation}
              className="bg-gradient-to-r from-primary via-accent to-secondary hover:opacity-90 transition-opacity"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Book Consultation with Ankit
            </Button>
          )}
        </div>

        <div className="text-center text-muted-foreground">
          <p>
            For a complete Vastu analysis of your home or office, book a consultation with Ankit.
          </p>
        </div>
      </div>
    </div>
  );
}

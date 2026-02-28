import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { useGenerateNumerologyReport, useGenerateVastuRemedies } from '../hooks/useQueries';
import type { NumerologyReport, VastuRemedy } from '../backend';

interface NumerologyFormProps {
  onReportGenerated: (report: NumerologyReport) => void;
  onVastuGenerated: (remedy: VastuRemedy) => void;
}

export default function NumerologyForm({ onReportGenerated, onVastuGenerated }: NumerologyFormProps) {
  const [name, setName] = useState('');
  const [date, setDate] = useState<Date>();
  const [errors, setErrors] = useState<{ name?: string; date?: string }>({});

  const generateReport = useGenerateNumerologyReport();
  const generateVastu = useGenerateVastuRemedies();

  const validate = () => {
    const newErrors: { name?: string; date?: string } = {};
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!date) {
      newErrors.date = 'Date of birth is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    const birthDate = format(date!, 'dd/MM/yyyy');
    
    try {
      const report = await generateReport.mutateAsync({
        userName: name,
        birthDate,
      });
      
      onReportGenerated(report);
      
      // Also generate Vastu remedies
      const remedy = await generateVastu.mutateAsync({
        userName: name,
        numerologyNumber: report.lifePathNumber,
      });
      
      onVastuGenerated(remedy);
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  const isLoading = generateReport.isPending || generateVastu.isPending;

  return (
    <Card className="border-primary/20 shadow-xl">
      <CardHeader className="text-center">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
          <img
            src="/assets/generated/mandala-pattern.dim_200x200.jpg"
            alt="Mandala"
            className="w-full h-full object-cover"
          />
        </div>
        <CardTitle className="text-2xl">Your Numerology Reading</CardTitle>
        <CardDescription>
          Enter your name and date of birth to receive your personalized report
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors({ ...errors, name: undefined });
              }}
              className={errors.name ? 'border-destructive' : ''}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Date of Birth</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full justify-start text-left font-normal ${
                    !date && 'text-muted-foreground'
                  } ${errors.date ? 'border-destructive' : ''}`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP') : 'Pick a date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => {
                    setDate(newDate);
                    if (errors.date) setErrors({ ...errors, date: undefined });
                  }}
                  disabled={(date) =>
                    date > new Date() || date < new Date('1900-01-01')
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.date && (
              <p className="text-sm text-destructive">{errors.date}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-primary via-accent to-secondary hover:opacity-90 transition-opacity"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Your Report...
              </>
            ) : (
              'Generate Report'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

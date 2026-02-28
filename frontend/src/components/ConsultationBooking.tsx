import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Loader2, CheckCircle2, Phone, User } from 'lucide-react';
import { useBookConsultation, useAvailableTimeSlots } from '../hooks/useQueries';

export default function ConsultationBooking() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [errors, setErrors] = useState<{ name?: string; phone?: string; slot?: string }>({});
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const { data: slots = [], isLoading: slotsLoading } = useAvailableTimeSlots();
  const bookConsultation = useBookConsultation();

  const validate = () => {
    const newErrors: { name?: string; phone?: string; slot?: string } = {};
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-()]+$/.test(phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!selectedSlot) {
      newErrors.slot = 'Please select a time slot';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    try {
      await bookConsultation.mutateAsync({
        userName: name,
        contactNumber: phone,
        selectedTimeSlot: selectedSlot,
      });
      
      setBookingSuccess(true);
      setName('');
      setPhone('');
      setSelectedSlot('');
    } catch (error) {
      console.error('Error booking consultation:', error);
    }
  };

  if (bookingSuccess) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="border-primary/20 shadow-xl text-center">
            <CardContent className="pt-12 pb-12">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-primary" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Booking Confirmed!</h2>
              <p className="text-muted-foreground mb-8">
                Thank you for booking a consultation with Ankit. You will receive a confirmation
                call shortly.
              </p>
              <Button
                onClick={() => setBookingSuccess(false)}
                className="bg-gradient-to-r from-primary via-accent to-secondary"
              >
                Book Another Consultation
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Book Your Consultation
          </h1>
          <p className="text-xl text-muted-foreground">
            Schedule a personal session with Ankit for in-depth guidance
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Booking Form */}
          <Card className="border-primary/20 shadow-lg">
            <CardHeader>
              <CardTitle>Consultation Details</CardTitle>
              <CardDescription>Fill in your details to book a session</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="booking-name">
                    <User className="w-4 h-4 inline mr-2" />
                    Full Name
                  </Label>
                  <Input
                    id="booking-name"
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
                  <Label htmlFor="booking-phone">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Contact Number
                  </Label>
                  <Input
                    id="booking-phone"
                    placeholder="+1 (555) 123-4567"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors({ ...errors, phone: undefined });
                    }}
                    className={errors.phone ? 'border-destructive' : ''}
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive">{errors.phone}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>
                    <Clock className="w-4 h-4 inline mr-2" />
                    Select Time Slot
                  </Label>
                  {slotsLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="w-6 h-6 animate-spin text-primary" />
                    </div>
                  ) : slots.length === 0 ? (
                    <p className="text-sm text-muted-foreground py-4">
                      No available slots at the moment. Please check back later.
                    </p>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      {slots
                        .filter((slot) => slot.isAvailable)
                        .map((slot) => (
                          <button
                            key={Number(slot.slotId)}
                            type="button"
                            onClick={() => {
                              setSelectedSlot(slot.timeRange);
                              if (errors.slot) setErrors({ ...errors, slot: undefined });
                            }}
                            className={`p-3 rounded-lg border-2 transition-all ${
                              selectedSlot === slot.timeRange
                                ? 'border-primary bg-primary/10'
                                : 'border-border hover:border-primary/50'
                            }`}
                          >
                            <div className="text-sm font-medium">{slot.timeRange}</div>
                          </button>
                        ))}
                    </div>
                  )}
                  {errors.slot && (
                    <p className="text-sm text-destructive">{errors.slot}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary via-accent to-secondary hover:opacity-90 transition-opacity"
                  disabled={bookConsultation.isPending}
                >
                  {bookConsultation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Booking...
                    </>
                  ) : (
                    <>
                      <Calendar className="mr-2 h-4 w-4" />
                      Confirm Booking
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Consultation Info */}
          <div className="space-y-6">
            <Card className="border-accent/20">
              <CardHeader>
                <CardTitle>What to Expect</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-accent">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Comprehensive Analysis</h4>
                    <p className="text-sm text-muted-foreground">
                      Deep dive into your numerology chart and personalized insights
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-accent">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Vastu Consultation</h4>
                    <p className="text-sm text-muted-foreground">
                      Detailed Vastu guidance for your home or office space
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-accent">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Personalized Remedies</h4>
                    <p className="text-sm text-muted-foreground">
                      Practical solutions and remedies tailored to your needs
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-secondary/20">
              <CardHeader>
                <CardTitle>Session Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Duration</span>
                  <Badge variant="outline">60 minutes</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Format</span>
                  <Badge variant="outline">Video Call / Phone</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Language</span>
                  <Badge variant="outline">English / Hindi</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

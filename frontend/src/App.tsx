import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import NumerologyForm from './components/NumerologyForm';
import NumerologyReport from './components/NumerologyReport';
import VastuRemedies from './components/VastuRemedies';
import ConsultationBooking from './components/ConsultationBooking';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import type { NumerologyReport as NumerologyReportType, VastuRemedy } from './backend';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [numerologyReport, setNumerologyReport] = useState<NumerologyReportType | null>(null);
  const [vastuRemedy, setVastuRemedy] = useState<VastuRemedy | null>(null);

  const handleReportGenerated = (report: NumerologyReportType) => {
    setNumerologyReport(report);
    setActiveTab('report');
  };

  const handleVastuGenerated = (remedy: VastuRemedy) => {
    setVastuRemedy(remedy);
  };

  const handleNavigateToVastu = () => {
    if (vastuRemedy) {
      setActiveTab('vastu');
    }
  };

  const handleNavigateToReport = () => {
    if (numerologyReport) {
      setActiveTab('report');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        hasReport={!!numerologyReport}
        hasVastu={!!vastuRemedy}
      />
      
      <main className="flex-1">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsContent value="home" className="mt-0">
            <Hero onGetStarted={() => setActiveTab('numerology')} />
          </TabsContent>

          <TabsContent value="numerology" className="mt-0">
            <div className="container mx-auto px-4 py-12">
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                  <h1 className="text-4xl font-bold text-foreground mb-4">
                    Discover Your Numerology
                  </h1>
                  <p className="text-muted-foreground text-lg">
                    Enter your details to receive a personalized numerology report
                  </p>
                </div>
                <NumerologyForm 
                  onReportGenerated={handleReportGenerated}
                  onVastuGenerated={handleVastuGenerated}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="report" className="mt-0">
            {numerologyReport ? (
              <NumerologyReport 
                report={numerologyReport} 
                onNavigateToVastu={handleNavigateToVastu}
                onBookConsultation={() => setActiveTab('consultation')}
                hasVastu={!!vastuRemedy}
              />
            ) : (
              <div className="container mx-auto px-4 py-12 text-center">
                <p className="text-muted-foreground">No report available. Please generate a report first.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="vastu" className="mt-0">
            {vastuRemedy ? (
              <VastuRemedies 
                remedy={vastuRemedy}
                onNavigateToReport={handleNavigateToReport}
                onBookConsultation={() => setActiveTab('consultation')}
              />
            ) : (
              <div className="container mx-auto px-4 py-12 text-center">
                <p className="text-muted-foreground">No Vastu remedies available. Please generate a report first.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="consultation" className="mt-0">
            <ConsultationBooking />
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}

export default App;

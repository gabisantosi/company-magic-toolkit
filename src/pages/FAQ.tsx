import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What type of business should I register in Sweden?",
      answer: "The most common business types in Sweden are Aktiebolag (AB) and Enskild Firma. The choice depends on factors like initial capital, liability preferences, and business scale. Our questionnaire can help you determine the best option for your situation."
    },
    {
      question: "How long does it take to register a company in Sweden?",
      answer: "The registration process typically takes 2-4 weeks for an Aktiebolag (AB) and 1-2 weeks for an Enskild Firma. However, this can vary depending on the complexity of your application and the current processing times at Bolagsverket."
    },
    {
      question: "What are the main costs of starting a business in Sweden?",
      answer: "The main costs include registration fees (varies by business type), share capital (for AB), and various administrative costs. Use our simulator to get a detailed breakdown of potential costs for your specific situation."
    },
    {
      question: "Do I need to be a Swedish resident to start a business?",
      answer: "No, you don't need to be a Swedish resident to start a business in Sweden. However, certain business types may require a Swedish personal identity number (personnummer) or a resident representative."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <h1 className="text-4xl font-bold text-swedish-blue">Frequently Asked Questions</h1>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-xl border border-swedish-blue/10 px-6 transition-all duration-300 hover:border-swedish-blue/20"
              >
                <AccordionTrigger className="hover:no-underline py-4">
                  <span className="text-left font-semibold text-swedish-blue">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-6 text-gray-700">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
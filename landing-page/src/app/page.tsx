import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Navbar } from "@/components/Navbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-b from-indigo-50 to-indigo-100">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 text-center lg:text-left max-w-2xl">
                <div className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-1 rounded-full text-sm mb-6">
                  <span className="inline-block w-2 h-2 bg-green-400 rounded-full"></span>
                  {new Intl.NumberFormat().format(30046)} resumes created today
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-indigo-950 mb-6">
                  The professional<br />resume builder
                </h1>
                <p className="text-xl text-indigo-700 mb-8">
                  Only 2% of resumes make it past the first round. Be in the top 2%.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8">
                    Create my resume
                  </Button>
                  <div className="flex items-center gap-2 text-indigo-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3ZM8 17C7.44772 17 7 16.5523 7 16C7 15.4477 7.44772 15 8 15C8.55228 15 9 15.4477 9 16C9 16.5523 8.55228 17 8 17ZM8 13C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11C8.55228 11 9 11.4477 9 12C9 12.5523 8.55228 13 8 13ZM8 9C7.44772 9 7 8.55228 7 8C7 7.44772 7.44772 7 8 7C8.55228 7 9 7.44772 9 8C9 8.55228 8.55228 9 8 9ZM16 17H12C11.4477 17 11 16.5523 11 16C11 15.4477 11.4477 15 12 15H16C16.5523 15 17 15.4477 17 16C17 16.5523 16.5523 17 16 17ZM16 13H12C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13ZM16 9H12C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7H16C16.5523 7 17 7.44772 17 8C17 8.55228 16.5523 9 16 9Z"/>
                    </svg>
                    <span>Just connect with LinkedIn - no resume needed!</span>
                  </div>
                </div>
                <div className="mt-12 flex items-center justify-center lg:justify-start gap-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-950">39%</div>
                    <div className="text-sm text-indigo-700">more likely to get hired</div>
                  </div>
                  <Separator orientation="vertical" className="h-12 bg-indigo-200" />
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-950">8%</div>
                    <div className="text-sm text-indigo-700">better pay with your next job</div>
                  </div>
                </div>
              </div>
              <div className="flex-1 relative">
                <div className="relative w-full aspect-[4/3] bg-white rounded-lg shadow-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-indigo-100"></div>
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-sm text-indigo-600">Live preview</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-indigo-950">Get hired fast with a powerful resume</h2>
              <p className="text-lg text-indigo-700">Our AI-powered platform helps you craft the perfect resume that stands out and gets you noticed.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-indigo-950">A better resume in minutes</h3>
                <p className="text-indigo-700">Replace your old resume with a professional template that recruiters love.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-indigo-950">ATS-friendly templates</h3>
                <p className="text-indigo-700">Ensure your resume is never filtered out by Applicant Tracking Systems.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-indigo-950">AI-powered content</h3>
                <p className="text-indigo-700">Get smart suggestions to make your experience stand out to employers.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Templates Section */}
        <section className="py-20 bg-indigo-950 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Battle-tested resume template</h2>
              <p className="text-lg text-indigo-200">Our template has been refined through thousands of successful job applications at top companies like Google, Apple, and Amazon. We focus on one perfect format instead of overwhelming you with choices.</p>
            </div>
            <div className="relative mx-auto max-w-lg">
              <div className="aspect-[3/4] bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-indigo-50 to-indigo-100"></div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                98% success rate
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 text-indigo-950">Reviewed by the community</h2>
                <div className="flex items-center justify-center gap-2 text-indigo-400 mb-4">
                  {"★★★★★".split("").map((star, i) => (
                    <span key={i} className="text-2xl">{star}</span>
                  ))}
                </div>
                <p className="text-lg text-indigo-700">4.8 out of 5 based on 123,456 reviews</p>
              </div>
              <div className="flex gap-6">
                <Card className="bg-indigo-50 border-0 w-[45%]">
                  <CardContent className="pt-6">
                    <p className="italic text-indigo-700 mb-4">
                      &ldquo;The AI suggestions helped me highlight my achievements in a way I never thought of. Landed my dream job within weeks!&rdquo;
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-200 rounded-full"></div>
                      <div>
                        <p className="font-semibold text-indigo-950">Sarah K.</p>
                        <p className="text-sm text-indigo-600">Software Engineer at Google</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <div className="flex flex-col gap-4 w-[55%]">
                  <Card className="bg-indigo-50/50 border-0">
                    <CardContent className="pt-6">
                      <p className="italic text-indigo-700 mb-4">
                        &ldquo;Clean, professional templates and the ATS optimization feature gave me confidence in my applications.&rdquo;
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-200 rounded-full"></div>
                        <div>
                          <p className="font-semibold text-indigo-950">Michael R.</p>
                          <p className="text-sm text-indigo-600">Product Manager at Apple</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-indigo-50/30 border-0">
                    <CardContent className="pt-6">
                      <p className="italic text-indigo-700 mb-4">
                        &ldquo;The LinkedIn integration saved me hours of manual work. Everything was perfectly formatted.&rdquo;
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-200 rounded-full"></div>
                        <div>
                          <p className="font-semibold text-indigo-950">Emily W.</p>
                          <p className="text-sm text-indigo-600">Marketing Director at Meta</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="flex justify-center mt-8 gap-2">
                <Button variant="outline" size="icon" className="rounded-full w-3 h-3 p-0 bg-indigo-600 border-0" />
                <Button variant="outline" size="icon" className="rounded-full w-3 h-3 p-0 bg-indigo-200 border-0" />
                <Button variant="outline" size="icon" className="rounded-full w-3 h-3 p-0 bg-indigo-200 border-0" />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-indigo-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-indigo-950">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="item-1" className="border rounded-lg bg-white px-6">
                  <AccordionTrigger className="text-lg text-indigo-950 hover:no-underline">
                    How do I create a resume?
                  </AccordionTrigger>
                  <AccordionContent className="text-indigo-700">
                    Simply choose a template, fill in your details with our AI-powered suggestions, and download your polished resume in minutes.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border rounded-lg bg-white px-6">
                  <AccordionTrigger className="text-lg text-indigo-950 hover:no-underline">
                    Is my resume ATS-friendly?
                  </AccordionTrigger>
                  <AccordionContent className="text-indigo-700">
                    Yes! All our templates are optimized for Applicant Tracking Systems, ensuring your resume gets past automated screenings.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="border rounded-lg bg-white px-6">
                  <AccordionTrigger className="text-lg text-indigo-950 hover:no-underline">
                    Can I download my resume in different formats?
                  </AccordionTrigger>
                  <AccordionContent className="text-indigo-700">
                    You can download your resume in PDF, Word, and plain text formats, perfect for different application requirements.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-indigo-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to land your dream job?</h2>
            <p className="text-xl mb-8 text-indigo-100">Join over 1 million professionals who&apos;ve advanced their careers with Waltzes</p>
            <Button size="lg" variant="outline" className="bg-white text-indigo-600 hover:bg-indigo-50 border-2 border-white">
              Create your resume now
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-indigo-950 text-indigo-300 py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-bold text-white mb-4">Waltzes</h3>
                <p className="text-sm">Building better careers through intelligent resume crafting</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-4">Features</h4>
                <ul className="space-y-2 text-sm">
                  <li>AI Assistant</li>
                  <li>ATS Optimization</li>
                  <li>Professional Templates</li>
                  <li>Export Options</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-4">Resources</h4>
                <ul className="space-y-2 text-sm">
                  <li>Blog</li>
                  <li>Career Tips</li>
                  <li>Resume Guide</li>
                  <li>FAQ</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-4">Company</h4>
                <ul className="space-y-2 text-sm">
                  <li>About Us</li>
                  <li>Contact</li>
                  <li>Privacy Policy</li>
                  <li>Terms of Service</li>
                </ul>
              </div>
            </div>
            <Separator className="my-8 bg-indigo-900" />
            <div className="text-center text-sm">
              © {new Date().getFullYear()} Waltzes. All rights reserved.
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}

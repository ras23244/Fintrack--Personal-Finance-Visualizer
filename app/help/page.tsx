"use client"

import { useState } from "react"
import { FileText, Info, LifeBuoy, Mail, MessageSquare, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const faqs = [
    {
      question: "How do I add a new transaction?",
      answer:
        "To add a new transaction, click on the 'Add Transaction' button in the dashboard or transactions page. Fill in the required details like amount, date, description, and category, then click 'Add Transaction' to save it.",
    },
    {
      question: "How do I set up a budget?",
      answer:
        "Navigate to the Budget page from the sidebar menu. Click on 'Add Budget', select a category, enter your monthly budget amount, and save. You can track your spending against this budget on the dashboard.",
    },
    {
      question: "Can I export my financial data?",
      answer:
        "Yes, you can export your data in CSV format. Go to Settings > Data & Privacy, and click on the 'Export Data' button. This will download a file containing all your transactions and financial information.",
    },
    {
      question: "How do I add a new account?",
      answer:
        "Go to the Accounts page from the sidebar menu. Click on 'Add Account', fill in your account details including name, type, balance, and institution, then save. Your new account will appear in the accounts list.",
    },
    {
      question: "How do I categorize my transactions?",
      answer:
        "When adding or editing a transaction, you can select a category from the dropdown menu. You can also create custom categories from the Categories page in the sidebar menu.",
    },
    {
      question: "Is my financial data secure?",
      answer:
        "Yes, we take security seriously. Your data is encrypted and stored securely. We use industry-standard security measures to protect your information. You can also enable two-factor authentication for additional security.",
    },
  ]

  const filteredFaqs = faqs.filter((faq) => faq.question.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Help Center</h1>
          <p className="text-muted-foreground">Find answers to common questions and get support.</p>
        </div>

        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for help..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <div>
                <CardTitle>Documentation</CardTitle>
                <CardDescription>Read the full documentation</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Explore detailed guides and tutorials on how to use all features of FinTrack.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Documentation
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              <div>
                <CardTitle>Community Forum</CardTitle>
                <CardDescription>Join the discussion</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Connect with other users, share tips, and get help from the community.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Visit Forum
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <LifeBuoy className="h-5 w-5 text-primary" />
              <div>
                <CardTitle>Contact Support</CardTitle>
                <CardDescription>Get help from our team</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Need personalized help? Our support team is ready to assist you.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Contact Support
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Tabs defaultValue="faq" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:w-auto">
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="guides">Guides</TabsTrigger>
            <TabsTrigger value="contact">Contact Us</TabsTrigger>
          </TabsList>

          <TabsContent value="faq" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>Find answers to common questions about FinTrack.</CardDescription>
              </CardHeader>
              <CardContent>
                {filteredFaqs.length > 0 ? (
                  <Accordion type="single" collapsible className="w-full">
                    {filteredFaqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                        <AccordionContent>{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Info className="h-10 w-10 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">No results found</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      We couldn't find any FAQs matching your search. Try a different query or contact support.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="guides" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Getting Started Guides</CardTitle>
                <CardDescription>Learn how to use FinTrack with these step-by-step guides.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <h3 className="text-lg font-medium">Getting Started with FinTrack</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Learn the basics of setting up your account and tracking your finances.
                    </p>
                    <Button variant="link" className="mt-2 p-0">
                      Read Guide
                    </Button>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h3 className="text-lg font-medium">Creating and Managing Budgets</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Learn how to set up budgets and track your spending against them.
                    </p>
                    <Button variant="link" className="mt-2 p-0">
                      Read Guide
                    </Button>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h3 className="text-lg font-medium">Understanding Financial Reports</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Learn how to interpret the charts and reports in your dashboard.
                    </p>
                    <Button variant="link" className="mt-2 p-0">
                      Read Guide
                    </Button>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h3 className="text-lg font-medium">Managing Multiple Accounts</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Learn how to add and manage multiple financial accounts in FinTrack.
                    </p>
                    <Button variant="link" className="mt-2 p-0">
                      Read Guide
                    </Button>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h3 className="text-lg font-medium">Importing and Exporting Data</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Learn how to import transactions from your bank and export your financial data.
                    </p>
                    <Button variant="link" className="mt-2 p-0">
                      Read Guide
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Contact Support</CardTitle>
                <CardDescription>Get in touch with our support team for personalized help.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <label htmlFor="name">Name</label>
                      <Input id="name" placeholder="Your name" />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="email">Email</label>
                      <Input id="email" type="email" placeholder="Your email" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="subject">Subject</label>
                    <Input id="subject" placeholder="How can we help you?" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="message">Message</label>
                    <Textarea id="message" placeholder="Please describe your issue in detail..." rows={5} />
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">support@fintrack.com</span>
                </div>
                <Button>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        <Separator className="my-4" />

        <div className="text-center">
          <h2 className="text-lg font-medium">Still need help?</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Our support team is available Monday through Friday, 9am to 5pm EST.
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <Button>
              <Mail className="mr-2 h-4 w-4" />
              Email Support
            </Button>
            <Button variant="outline">
              <MessageSquare className="mr-2 h-4 w-4" />
              Live Chat
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

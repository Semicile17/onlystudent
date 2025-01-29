import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function TermsPage() {
  return (
    <div className="flex justify-center p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Terms & Conditions</CardTitle>
          <p className="text-sm text-gray-500">Last updated on 30-01-2025 10:30:49</p>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[60vh] p-2 border rounded-md">
            <p>
              These Terms and Conditions, along with the privacy policy or other terms
              (“Terms”) constitute a binding agreement by and between ROHIT MAHANT
              (“Website Owner” or “we” or “us” or “our”) and you (“you” or “your”) and
              relate to your use of our website, goods (as applicable) or services (as
              applicable) (collectively, “Services”).
            </p>
            <p className="mt-2">
              By using our website and availing the Services, you agree that you have read
              and accepted these Terms (including the Privacy Policy). We reserve the
              right to modify these Terms at any time and without assigning any reason.
            </p>
            <p className="mt-2 font-semibold">Use of Website & Services:</p>
            <ul className="list-disc pl-6">
              <li>You must provide true, accurate, and complete information.</li>
              <li>We do not guarantee the accuracy or completeness of the information.</li>
              <li>Your use of the website is at your own risk.</li>
              <li>Unauthorized use may result in legal action.</li>
              <li>Service charges must be paid as applicable.</li>
            </ul>
            <p className="mt-2 font-semibold">Legal & Dispute Resolution:</p>
            <ul className="list-disc pl-6">
              <li>The Terms are governed by Indian law.</li>
              <li>Disputes shall be subject to the courts in Chiniyalisour, Uttarakhand.</li>
              <li>Refunds will be processed per policy timelines.</li>
            </ul>
            <p className="mt-2">
              For any concerns, contact us using the details provided on this website.
            </p>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}

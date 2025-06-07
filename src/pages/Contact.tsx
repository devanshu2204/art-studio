import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0);

  const RATE_LIMIT_DELAY = 30000;

  const sanitizeInput = (input: string): string => {
    return input
      .replace(/[<>]/g, '')
      .trim()
      .slice(0, 1000);
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const currentTime = Date.now();
    if (currentTime - lastSubmissionTime < RATE_LIMIT_DELAY) {
      toast({
        title: "Too many requests",
        description: "Please wait before submitting another message.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (!isValidEmail(formData.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    if (formData.message.length < 10) {
      toast({
        title: "Message too short",
        description: "Please provide a more detailed message.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    const sanitizedData = {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      subject: sanitizeInput(formData.subject),
      message: sanitizeInput(formData.message)
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sanitizedData)
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Something went wrong');
      }

      setLastSubmissionTime(currentTime);
      setFormData({ name: '', email: '', subject: '', message: '' });
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I will get back to you soon."
      });
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gallery-cream py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-4">
            Let's Work Together
          </h1>
          <p className="text-xl text-muted-foreground">
            Interested in commissioning a piece or have questions about my work? I'd love to hear from you.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-display text-2xl text-foreground">
                  Send me a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        maxLength={100}
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        maxLength={100}
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      maxLength={200}
                      value={formData.subject}
                      onChange={handleChange}
                      className="mt-1"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      maxLength={2000}
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="mt-1"
                      placeholder="Tell me about your project or inquiry..."
                      disabled={isSubmitting}
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      {formData.message.length}/2000 characters
                    </p>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                Get in Touch
              </h2>
              <p className="text-muted-foreground mb-6">
                I'm always excited to discuss new projects and creative collaborations.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gallery-gold rounded-lg flex items-center justify-center">
                  <Mail size={18} className="text-white" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Email</p>
                  <p className="text-muted-foreground text-sm">devanshu.debu2004@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gallery-gold rounded-lg flex items-center justify-center">
                  <Phone size={18} className="text-white" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Phone</p>
                  <p className="text-muted-foreground text-sm">+91 96438902</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gallery-gold rounded-lg flex items-center justify-center">
                  <MapPin size={18} className="text-white" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Location</p>
                  <p className="text-muted-foreground text-sm">New Delhi, India</p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <h3 className="font-medium text-foreground mb-3">Commission Process</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>1. Initial consultation</p>
                <p>2. Concept development</p>
                <p>3. Creation timeline</p>
                <p>4. Final delivery</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

import { useParams } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Separator } from '../components/ui/separator'

export default function LegalPage() {
  const { page } = useParams()

  const renderContent = () => {
    switch (page) {
      case 'privacy':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
              <p className="text-muted-foreground mb-4">Last updated: January 2024</p>
            </div>

            <div className="space-y-6">
              <section>
                <h3 className="text-xl font-semibold mb-3">Information We Collect</h3>
                <p className="text-muted-foreground mb-4">
                  We collect information you provide directly to us, such as when you create an account, 
                  participate in auctions, or contact us for support.
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Account information (name, email, password)</li>
                  <li>Profile information and preferences</li>
                  <li>Auction and bidding activity</li>
                  <li>Payment and transaction information</li>
                  <li>Communications with our support team</li>
                </ul>
              </section>

              <Separator />

              <section>
                <h3 className="text-xl font-semibold mb-3">How We Use Your Information</h3>
                <p className="text-muted-foreground mb-4">
                  We use the information we collect to provide, maintain, and improve our services.
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Process transactions and manage auctions</li>
                  <li>Send notifications about your account and auctions</li>
                  <li>Provide customer support</li>
                  <li>Detect and prevent fraud</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <Separator />

              <section>
                <h3 className="text-xl font-semibold mb-3">Information Sharing</h3>
                <p className="text-muted-foreground">
                  We do not sell, trade, or otherwise transfer your personal information to third parties 
                  without your consent, except as described in this policy or as required by law.
                </p>
              </section>

              <Separator />

              <section>
                <h3 className="text-xl font-semibold mb-3">Data Security</h3>
                <p className="text-muted-foreground">
                  We implement appropriate security measures to protect your personal information against 
                  unauthorized access, alteration, disclosure, or destruction.
                </p>
              </section>

              <Separator />

              <section>
                <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
                <p className="text-muted-foreground">
                  If you have any questions about this Privacy Policy, please contact us at 
                  privacy@musicauction.com.
                </p>
              </section>
            </div>
          </div>
        )

      case 'terms':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Terms of Service</h2>
              <p className="text-muted-foreground mb-4">Last updated: January 2024</p>
            </div>

            <div className="space-y-6">
              <section>
                <h3 className="text-xl font-semibold mb-3">Acceptance of Terms</h3>
                <p className="text-muted-foreground">
                  By accessing and using MusicAuction, you accept and agree to be bound by the terms 
                  and provision of this agreement.
                </p>
              </section>

              <Separator />

              <section>
                <h3 className="text-xl font-semibold mb-3">User Accounts</h3>
                <p className="text-muted-foreground mb-4">
                  To participate in auctions, you must create an account and provide accurate information.
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>You are responsible for maintaining account security</li>
                  <li>You must be at least 18 years old to create an account</li>
                  <li>One account per person or entity</li>
                  <li>You are responsible for all activities under your account</li>
                </ul>
              </section>

              <Separator />

              <section>
                <h3 className="text-xl font-semibold mb-3">Auction Rules</h3>
                <p className="text-muted-foreground mb-4">
                  All auctions are subject to the following rules:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Bids are binding and cannot be retracted</li>
                  <li>The highest bidder at auction end wins</li>
                  <li>Payment must be completed within 48 hours</li>
                  <li>All sales are final</li>
                  <li>Sellers must have legitimate rights to the content</li>
                </ul>
              </section>

              <Separator />

              <section>
                <h3 className="text-xl font-semibold mb-3">Prohibited Activities</h3>
                <p className="text-muted-foreground mb-4">
                  The following activities are strictly prohibited:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Bid manipulation or shill bidding</li>
                  <li>Uploading copyrighted content without permission</li>
                  <li>Creating multiple accounts to circumvent restrictions</li>
                  <li>Harassment or abusive behavior</li>
                  <li>Attempting to bypass our security measures</li>
                </ul>
              </section>

              <Separator />

              <section>
                <h3 className="text-xl font-semibold mb-3">Termination</h3>
                <p className="text-muted-foreground">
                  We reserve the right to terminate or suspend accounts that violate these terms 
                  or engage in prohibited activities.
                </p>
              </section>
            </div>
          </div>
        )

      case 'offer':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Public Offer</h2>
              <p className="text-muted-foreground mb-4">Last updated: January 2024</p>
            </div>

            <div className="space-y-6">
              <section>
                <h3 className="text-xl font-semibold mb-3">Service Description</h3>
                <p className="text-muted-foreground">
                  MusicAuction provides an online platform for buying, selling, and licensing music 
                  content through secure auction mechanisms.
                </p>
              </section>

              <Separator />

              <section>
                <h3 className="text-xl font-semibold mb-3">Fees and Charges</h3>
                <p className="text-muted-foreground mb-4">
                  Our platform charges the following fees:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Seller commission: 10% of final sale price</li>
                  <li>Buyer premium: 5% of winning bid</li>
                  <li>Payment processing fees as applicable</li>
                  <li>Premium listing fees for featured auctions</li>
                </ul>
              </section>

              <Separator />

              <section>
                <h3 className="text-xl font-semibold mb-3">Payment Terms</h3>
                <p className="text-muted-foreground mb-4">
                  Payment terms and conditions:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Payment due within 48 hours of auction end</li>
                  <li>Accepted payment methods: Credit card, PayPal, bank transfer</li>
                  <li>Escrow protection for high-value transactions</li>
                  <li>Refunds processed according to our refund policy</li>
                </ul>
              </section>

              <Separator />

              <section>
                <h3 className="text-xl font-semibold mb-3">Licensing and Rights</h3>
                <p className="text-muted-foreground">
                  Upon successful purchase, buyers receive the licensing rights as specified in the 
                  auction listing. All rights transfers are documented and legally binding.
                </p>
              </section>

              <Separator />

              <section>
                <h3 className="text-xl font-semibold mb-3">Dispute Resolution</h3>
                <p className="text-muted-foreground">
                  Disputes are handled through our internal mediation process. For unresolved issues, 
                  binding arbitration may be required as specified in our Terms of Service.
                </p>
              </section>
            </div>
          </div>
        )

      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Legal Document Not Found</h2>
            <p className="text-muted-foreground">
              The requested legal document could not be found.
            </p>
          </div>
        )
    }
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-8">
          {renderContent()}
        </CardContent>
      </Card>
    </div>
  )
}
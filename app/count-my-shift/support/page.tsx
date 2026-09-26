import { pageMetadata } from "@/lib/site-pages";
import Link from "next/link";
import { Arrow } from "@/components/Marks";
import { supportEmail } from "@/lib/apps";
export const metadata = pageMetadata("count-my-shift-support");
const questions = [
  {
    title: "How do I start tracking?",
    body: "First choose whether to share optional usage analytics. Allow analytics and No thanks both continue to job setup. Create your first job, then tap Log a shift. Add your hours, cash and card tips, tip-out and wages. Your weekly and monthly summaries update from the records you save. Earnings are before taxes and other deductions.",
  },
  {
    title: "Can I use Count My Shift on iPad?",
    body: "Yes. Count My Shift supports iPhone and iPad, with iPad layouts that adapt to portrait, landscape and narrower windows. Wider layouts give your dashboard more room and show shift history alongside its details. Use the same Apple Account and enable iCloud to keep your notebook available across your devices.",
  },
  {
    title: "How do I send feedback?",
    body: "Open Settings → Send feedback to compose an email to dev@aldoleka.com in your email app. If an email app is not configured, you can email that address directly. Nothing is sent automatically, and the app does not attach your notebook or analytics identifier. Describe the issue or idea and include your app version and device model if useful. Please leave out passwords, payment details and personal income records.",
  },
  {
    title: "How do I combine different currencies?",
    body: "Choose a currency when you create each job. If the selected shifts all use one currency, Home, History and Insights keep that currency, even if your reporting currency differs. When the selection includes multiple currencies, combined totals and graphs convert into Settings → Reporting currency. This choice is remembered and also becomes the default for new jobs. Each saved shift always keeps its job’s original currency. Plus is needed for multiple active jobs.",
  },
  {
    title: "How is the initial currency chosen?",
    body: "The initial currency follows your device’s Region setting, without asking for location access. If the region’s currency is not supported, the app starts with USD. You can change the reporting currency in Settings and choose another currency when adding a job. Your language follows the system or the app language selected in device settings.",
  },
  {
    title: "Which exchange rates are used?",
    body: "For each shift, Count My Shift uses a published rate on or before the shift date, supplied by Frankfurter. Weekends and holidays may use the previous published rate. The converted shift values are then added together. Recent rates may update as data becomes available. Converted totals are estimates and can differ from your bank’s rate or tax-reporting requirements. No money is exchanged.",
  },
  {
    title: "Why does a converted total say rates are unavailable?",
    body: "The app needs a rate for every foreign-currency shift included in a summary. It waits rather than showing a misleading partial total. Connect to the internet, then use Try again in the exchange-rate message. Downloaded rates work offline. A new date range may need more rates, and a future foreign-currency shift must wait for an available published rate. Your original shifts remain visible and editable.",
  },
  {
    title: "Are CSV exports converted too?",
    body: "No. CSV exports, backups, shift details and payment records keep their original amounts and currencies. Conversion is used for combined summaries and job comparisons. The app downloads public rate tables; your income amounts, job names, notes and payment records are never sent to the exchange-rate service.",
  },
  {
    title: "How does iCloud sync work?",
    body: "Count My Shift can sync jobs, shifts and payment records between iPhone and iPad through your private iCloud account. Use the same Apple Account on both devices and allow the app to use iCloud in device settings. Reporting currency, analytics consent and reminders are separate on each device. Check Settings → iCloud & backup inside the app for sync information. Changes may take time to arrive, especially after being offline. Make a backup before troubleshooting; don’t delete the app to try to force a sync.",
  },
  {
    title: "How do I back up or export my records?",
    body: "Open Settings → iCloud & backup to save a notebook backup or restore one. Restoring is additive: it combines records rather than replacing your whole notebook. Keep the safety copy offered before a restore. For a spreadsheet, choose “Export all shifts as CSV” in Settings. Keep exports and backup files somewhere private; they contain your financial records.",
  },
  {
    title: "What does Plus include?",
    body: "Plus unlocks multiple active jobs and comparisons between jobs with one purchase. It is not a subscription. Your existing records, basic summaries, iCloud sync, backup and CSV export remain available without Plus. The App Store displays the price before you confirm a purchase.",
  },
  {
    title: "How do I restore Plus?",
    body: "Open Settings → Count My Shift Plus (or Explore Plus), then choose “Restore purchases”. Use the Apple Account that made the purchase and make sure you are online. If Plus still does not appear, contact support with your app version and a description of what happened. Never send your Apple Account password.",
  },
  {
    title: "Can I edit or delete a shift?",
    body: "Open the shift from History to review or edit it. Deleting a shift updates your totals and can sync to your other devices. Archiving a job keeps its history; it does not erase it. Backups and CSV files you already exported remain separate copies.",
  },
  {
    title: "How do I change analytics or reminders?",
    body: "On first use, a separate analytics choice appears before job setup. You can choose No thanks and keep using every free or purchased feature. Your choice is remembered on that device and can be changed in Settings → Usage analytics. This is consent for optional product analytics, not advertising or tracking across other companies’ apps or websites. Reminders are configured separately in Settings → Reminders; notification permission is requested when you enable them.",
  },
  {
    title: "I’m testing through TestFlight. What should I know?",
    body: "The beta may change before launch. Purchases made in TestFlight use Apple’s sandbox and do not charge you. If an invite says your Apple Account is already associated with the app, return to the main TestFlight app list and open Count My Shift there. If you still cannot install, send the exact message and your iOS version to support.",
  },
];
export default function SupportPage() {
  return (
    <div className="reading-page wrap">
      <p className="eyebrow">Count My Shift · Help & contact</p>
      <h1>
        Here to <span className="underlined">help.</span>
      </h1>
      <p className="lead">A little guidance for your notebook.</p>
      <div className="support-contact peach">
        <div>
          <h2>Can’t find what you need?</h2>
          <p>
            Tell me what happened, your app version, device model and iOS or
            iPadOS version.
          </p>
        </div>
        <a
          className="text-link"
          href={`mailto:${supportEmail}?subject=Count%20My%20Shift%20support`}
        >
          Email Aldo <Arrow diagonal />
        </a>
        <p className="fine-print">
          {supportEmail} · Please leave out passwords, payment details and
          personal income records.
        </p>
      </div>
      <div className="faq-list">
        {questions.map(({ title, body }) => (
          <details key={title}>
            <summary>
              {title}
              <span aria-hidden="true">+</span>
            </summary>
            <div className="faq-answer">
              <p>{body}</p>
            </div>
          </details>
        ))}
      </div>
      <p className="prose">
        For information about your notebook and optional analytics, read the{" "}
        <Link href="/count-my-shift/privacy">privacy policy</Link>.
      </p>
    </div>
  );
}

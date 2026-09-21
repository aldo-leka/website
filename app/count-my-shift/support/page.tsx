import { pageMetadata } from "@/lib/site-pages";
import Link from "next/link";
import { Arrow } from "@/components/Marks";
import { contactEmail } from "@/lib/apps";
export const metadata = pageMetadata("count-my-shift-support");
const questions = [
  {
    title: "How do I start tracking?",
    body: "Create your first job, then tap the plus button to log a shift. Add your hours, cash and card tips, tip-out and wages. Your weekly and monthly summaries update from the records you save. Earnings are before taxes and other deductions.",
  },
  {
    title: "How does iCloud sync work?",
    body: "Count My Shift can sync your notebook through your private iCloud account. Use the same Apple Account on both devices and allow the app to use iCloud in your iPhone settings. Check Settings → iCloud & backup inside the app for sync information. Changes may take time to arrive, especially after being offline. Make a backup before troubleshooting; don’t delete the app to try to force a sync.",
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
    body: "Optional usage analytics is controlled in Settings → Usage analytics. You can leave it off and keep using the app. Reminders are configured separately in Settings → Reminders; notification permission is requested when you enable them.",
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
            Tell me what happened, your app version and your iPhone’s iOS
            version.
          </p>
        </div>
        <a
          className="text-link"
          href={`mailto:${contactEmail}?subject=Count%20My%20Shift%20support`}
        >
          Email Aldo <Arrow diagonal />
        </a>
        <p className="fine-print">
          {contactEmail} · Please leave out passwords, payment details and
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

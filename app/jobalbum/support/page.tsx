import Link from "next/link";
import { Arrow } from "@/components/Marks";
import { contactEmail } from "@/lib/apps";
import { pageMetadata } from "@/lib/site-pages";

export const metadata = pageMetadata("jobalbum-support");

const questions = [
  {
    title: "How do jobs and Quick capture work?",
    body: "Each job is one photo album for a piece of work or a visit. Create a job, give it a name and optionally add a description and an Address or place label. For recurring work, create a separate job per visit. Quick capture is the inbox for photos taken without choosing a named job; move them into a job afterward. There are no nested albums inside a job.",
  },
  {
    title: "How do I know a photo was saved?",
    body: "Allow camera access, choose your job or Quick capture, and take a photo. After Saved to JobAlbum appears, the camera stays ready for the next shot. Tap the thumbnail to view the latest photo or add a note. The app keeps an original and a stamped copy. If it reports that only the original was saved, open that photo to retry the stamp. If a save fails, follow the retry message and check available iPhone storage before closing the app; an unsaved capture may not survive closing it.",
  },
  {
    title: "How does photo location work?",
    body: "JobAlbum asks for location permission when you use the camera. Once allowed, it automatically saves a recent, sufficiently accurate position with each photo. Location updates stop when the camera closes. Capture still works if permission is denied or location is unavailable; an early shot or an indoor capture may have no location. You can manage permission in iPhone Settings. Open a photo to see a nearby address and Apple map when available. The address can refer to a neighboring property. Address and map lookups need internet. The Address or place field in job details is text you enter yourself and is separate from the photo position. Apple's looked-up addresses are temporary display information and are not printed in reports.",
  },
  {
    title: "Where does the timestamp come from?",
    body: "Date, time and time zone are recorded from your iPhone at capture. Photo details follow your regional date/time format; new stamps and reports include the UTC offset at capture. Older stamped JPEGs retain their existing appearance. Check your iPhone’s Date & Time settings if the time looks wrong. These records are not certified or tamper-proof evidence. Moving a photo to another album keeps its original capture-time job label.",
  },
  {
    title: "How do I export a report or photos?",
    body: "Open a job, select photos and choose Export. Free PDF samples include up to three selected photos in capture order; individual JPEG sharing is also free. Pro adds full PDF reports, batch JPEG exports, stamp layouts and report customization. Include location adds the saved job address and photo map links to PDFs, or recorded location metadata to JPEGs. The switch starts off, remembers your choice and is hidden when no location is available for that format. Turning it off omits those details, including embedded GPS metadata in JPEGs. It cannot remove an address visible in a photographed scene or typed into a job name or note. Edit an optional address in the job details, not the export screen. More options contains photo versions, notes and Pro report customization. New stamps show date, time and the selected job-name setting without coordinates. Exported JPEGs preserve image pixels for original JPEG sources and keep only capture time, image orientation and optional location metadata. Check the preview, then save or share. Confirm the file reached the destination: opening the share sheet alone does not confirm delivery.",
  },
  {
    title: "Are photos automatically added to Apple Photos?",
    body: "No. Originals and stamped copies are kept in JobAlbum. Settings → Also save stamped photos to Photos adds an extra stamped copy to your Photos library after successful capture. This is off by default and asks for add-only Photos permission when enabled. If adding the Photos copy fails, the app reports that separately from saving in JobAlbum. Copies in Photos follow your Apple settings, including iCloud Photos if enabled.",
  },
  {
    title: "What is free, and what does Pro unlock?",
    body: "Free includes photo capture, three active jobs, unlimited archived jobs, individual JPEG sharing and PDF samples of up to three selected photos. Pro adds unlimited active jobs, full PDF reports, batch JPEG exports and stamp/report customization. It is a one-time purchase with no subscription. Your existing jobs and photos stay accessible if Pro is temporarily unavailable. Apple shows the price for your country before you confirm.",
  },
  {
    title: "How do I restore Pro?",
    body: "Open Settings → Restore purchases, or use Restore purchases on the JobAlbum Pro screen. Use the Apple Account that bought Pro and an internet connection. A pending purchase may still need approval. Restoring Pro restores the upgrade, not your local photo library. TestFlight purchases use Apple’s sandbox and do not charge testers.",
  },
  {
    title: "Does JobAlbum sync or back up my albums?",
    body: "JobAlbum stores its library locally and does not provide its own cloud backup, iCloud album sync or a team account. Apple device backups may include app data depending on your settings. Export important originals and reports to Files or another destination you control before replacing your phone or deleting the app. Exported files are records to keep or share; JobAlbum does not currently offer a library-import or backup-restore feature.",
  },
  {
    title: "What is the difference between archiving and deleting?",
    body: "Archiving hides a completed job from Active and keeps its photos. Deleting photos or a job removes that content from JobAlbum after confirmation; there is no in-app trash or undo recovery. Deleting the app removes its local library, while offloading may retain documents and data. Photos-library copies, shared files and device backups are separate and must be managed in their own locations.",
  },
  {
    title: "Can I use JobAlbum offline and without analytics?",
    body: "Yes. Capture, notes, albums and file preparation work locally. Buying or restoring Pro needs an internet connection, and sharing may need one depending on the destination. Analytics is off until you choose Share usage analytics. You can choose No thanks during onboarding or change Settings → Share usage analytics at any time. Free and Pro features do not depend on analytics consent.",
  },
];

export default function SupportPage() {
  return (
    <div className="reading-page wrap">
      <p className="eyebrow">JobAlbum · Help & contact</p>
      <h1>
        Here to <span className="underlined">help.</span>
      </h1>
      <p className="lead">
        A little guidance for your photos, albums and reports.
      </p>
      <div className="support-contact sage">
        <div>
          <h2>Can’t find what you need?</h2>
          <p>
            Tell me what happened, your app version and your iPhone’s iOS
            version.
          </p>
        </div>
        <a
          className="text-link"
          href={`mailto:${contactEmail}?subject=JobAlbum%20support`}
        >
          Email Aldo <Arrow diagonal />
        </a>
        <p className="fine-print">{contactEmail}</p>
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
        For information about photos, permissions and optional analytics, read
        the <Link href="/jobalbum/privacy">privacy policy</Link>.
      </p>
    </div>
  );
}

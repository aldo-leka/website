import { Arrow } from "./Marks";
export function StoreLink({ url }: { url: string | null }) {
  return url ? (
    <a className="button store-link" href={url}>
      View on the App Store <Arrow diagonal />
    </a>
  ) : (
    <p className="store-soon">
      <span aria-hidden="true" className="status-dot" />
      Coming to the App Store
    </p>
  );
}

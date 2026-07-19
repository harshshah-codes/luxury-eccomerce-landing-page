'use client';

import type { SiteConfig } from '@/lib/site-config';
import { RichText } from '@/lib/helpers';

export default function Footer({ cfg }: { cfg: SiteConfig }) {
  const f = cfg.footer;
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__top">
          <div>
            <div className="footer__brand"><RichText text={f.brand} /></div>
            <p className="footer__tag">{f.tag}</p>
            <div className="footer__newsletter">
              <input type="email" placeholder="Your email for private communications" />
              <button>Submit →</button>
            </div>
          </div>
          {f.columns.map((col, i) => (
            <div className="footer__col" key={i}>
              <div className="footer__col-title">{col.title}</div>
              <ul>
                {col.links.map((link, j) => (
                  <li key={j}>
                    {link.href ? <a href={link.href}>{link.label}</a> : <span>{link.label}</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer__bottom">
          <div>{f.copyright}</div>
          <div>{f.tagline}</div>
        </div>
      </div>
    </footer>
  );
}

import { person } from '@/lib/content';

export default function Footer() {
  return (
    <footer className="site-footer">
      <a href="#top" className="footer-mark">ZYN<span>.</span></a>
      <p>{person.name} <span>·</span> {person.role}</p>
      <a href="#top" className="back-top">Back to top ↑</a>
    </footer>
  );
}

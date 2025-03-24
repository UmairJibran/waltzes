import { Separator } from '@radix-ui/react-separator';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-indigo-950 text-indigo-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-white mb-4">Waltzes</h3>
            <p className="text-sm">
              Building better careers through intelligent resume crafting
            </p>
            <p className="text-sm">
              <Link href="/blogs" className="underline">
                Read our blog
              </Link>
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Features</h4>
            <ul className="space-y-2 text-sm">
              <li>AI Assistant</li>
              <li>ATS Optimization</li>
              <li>Professional Templates</li>
              <li>Export Options</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="mailto:waltzes@umairjibran.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="https://discord.gg/thXRRXSD4b"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Feedback
                </a>
              </li>
              <li>
                <a href="/privacy">Privacy Policy</a>
              </li>
              <li>
                <a href="/terms">Terms of Service</a>
              </li>
            </ul>
          </div>
        </div>
        <Separator className="my-8 bg-indigo-900" />
        <div className="text-center text-sm">
          © {new Date().getFullYear()} Waltzes. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

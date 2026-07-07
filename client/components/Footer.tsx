import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-indigo-100">

      <div className="section py-16">

        <div className="grid lg:grid-cols-4 gap-10">

          <div>

            <h2 className="text-3xl font-black text-indigo-700">
              File
              <span className="text-orange-500">
                Moon
              </span>
            </h2>

            <p className="text-gray-500 mt-5 leading-7">
              Secure cloud file sharing platform inspired by
              modern SaaS applications.
            </p>

          </div>

          <div>

            <h3 className="font-bold mb-4">
              Product
            </h3>

            <div className="space-y-3">

              <Link href="/">
                Features
              </Link>

              <br />

              <Link href="/">
                Pricing
              </Link>

              <br />

              <Link href="/">
                Download
              </Link>

            </div>

          </div>

          <div>

            <h3 className="font-bold mb-4">
              Company
            </h3>

            <div className="space-y-3">

              <Link href="/">
                About
              </Link>

              <br />

              <Link href="/">
                Contact
              </Link>

              <br />

              <Link href="/">
                Support
              </Link>

            </div>

          </div>

          <div>

            <h3 className="font-bold mb-4">
              Legal
            </h3>

            <div className="space-y-3">

              <Link href="/">
                Privacy
              </Link>

              <br />

              <Link href="/">
                Terms
              </Link>

            </div>

          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-indigo-100 text-center text-gray-500">

          © {new Date().getFullYear()} FileMoon. All Rights Reserved.

        </div>

      </div>

    </footer>
  );
}
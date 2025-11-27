import React, { ReactNode } from "react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (session) redirect("/");

  return (
    <main className="auth-container">
      <section className="auth-form">
        <div className="auth-box space-y-8">
          <header className="flex items-center gap-5">
            <Image src="/icons/logo.png" alt="logo" width={100} height={100} />
            <div>
              <p className="text-sm text-slate-300">
                Sign in to manage bookings and cars.
              </p>
            </div>
          </header>

          <div className="space-y-6">{children}</div>

          <p className="text-xs text-slate-400 text-center">
            By continuing you agree to our Terms &amp; Privacy Policy.
          </p>
        </div>
      </section>

      <section className="auth-illustration hidden sm:block">
        <div className="hero__image-container relative h-full w-full">
          <Image src="/images/Ads.png" alt="" fill className="object-cover " />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

          <div className="pointer-events-none absolute bottom-10 left-1/2 w-full -translate-x-1/2 px-6 text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
              Car rental platform
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-50">
              Find the perfect car in minutes.
            </h2>
          </div>
        </div>
      </section>
    </main>
  );
};
export default Layout;

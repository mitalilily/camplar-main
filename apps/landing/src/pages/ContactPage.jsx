import { useState } from "react";
import SiteFooter from "../components/site/SiteFooter";
import SiteHeader from "../components/site/SiteHeader";
import { companyInfo } from "../utils/siteContent";

const initialForm = {
  name: "",
  email: "",
  message: "",
};

function encodeForm(data) {
  return Object.entries(data)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join("&");
}

export default function ContactPage() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "idle", message: "" });

  const handleChange = (key) => (event) => {
    setForm((current) => ({
      ...current,
      [key]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({
        type: "error",
        message: "Please fill in your name, email, and message before submitting.",
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setStatus({
        type: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }

    setStatus({ type: "loading", message: "Sending your inquiry..." });

    try {
      const isLocalHost = ["localhost", "127.0.0.1"].includes(window.location.hostname);

      if (isLocalHost) {
        await new Promise((resolve) => setTimeout(resolve, 500));
      } else {
        const response = await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: encodeForm({
            "form-name": "camplar-contact",
            ...form,
          }),
        });

        if (!response.ok) {
          throw new Error("Unable to send the form.");
        }
      }

      setForm(initialForm);
      setStatus({
        type: "success",
        message: "Thanks for reaching out. The CAMPLAR team will get back to you shortly.",
      });
    } catch {
      setStatus({
        type: "error",
        message:
          "Something went wrong while sending your request. Please email us directly at camplar11@gmail.com.",
      });
    }
  };

  return (
    <div className="site-shell">
      <SiteHeader />

      <main>
        <section className="hero-gradient border-b border-slate-200/70">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
            <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr]">
              <div className="max-w-2xl">
                <span className="badge-red">Contact CAMPLAR</span>
                <h1 className="mt-6 font-heading text-5xl leading-[0.96] tracking-[0.04em] text-slate-950 sm:text-6xl">
                  Book a demo or talk through your shipping workflow.
                </h1>
                <p className="mt-6 text-lg leading-8 text-slate-600">
                  Reach out for platform walkthroughs, courier aggregation discussions, or support
                  around rate comparison, tracking, COD, and NDR operations.
                </p>

                <div className="mt-10 grid gap-4">
                  <div className="surface-card p-6">
                    <p className="section-kicker">Email</p>
                    <a
                      className="mt-3 block text-xl font-semibold text-slate-950 transition hover:text-red-600"
                      href={`mailto:${companyInfo.email}`}
                    >
                      {companyInfo.email}
                    </a>
                  </div>
                  <div className="surface-card p-6">
                    <p className="section-kicker">Phone</p>
                    <div className="mt-3 flex flex-col gap-2">
                      {companyInfo.phones.map((phone) => (
                        <a
                          key={phone}
                          className="text-xl font-semibold text-slate-950 transition hover:text-red-600"
                          href={`tel:${phone.replace(/\s+/g, "")}`}
                        >
                          {phone}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="surface-card p-6">
                    <p className="section-kicker">Office address</p>
                    <p className="mt-3 text-lg leading-8 text-slate-600">{companyInfo.address}</p>
                    <a
                      className="mt-4 inline-flex rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:border-red-500/30 hover:bg-red-500/5 hover:text-red-600"
                      href={companyInfo.mapLink}
                      rel="noreferrer"
                      target="_blank"
                    >
                      Get Directions
                    </a>
                  </div>
                </div>
              </div>

              <div className="grid gap-5">
                <form
                  className="surface-card p-6"
                  data-netlify="true"
                  method="POST"
                  name="camplar-contact"
                  onSubmit={handleSubmit}
                >
                  <input name="form-name" type="hidden" value="camplar-contact" />
                  <input name="bot-field" type="hidden" />

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="section-kicker">We are here to help</p>
                      <h2 className="mt-3 font-heading text-4xl tracking-[0.05em] text-slate-950">
                        Send your inquiry
                      </h2>
                    </div>
                    <span className="rounded-full bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-red-700">
                      Netlify-ready form
                    </span>
                  </div>

                  <div className="mt-6 grid gap-4">
                    <label className="form-field">
                      <span>Name</span>
                      <input name="name" onChange={handleChange("name")} value={form.name} />
                    </label>
                    <label className="form-field">
                      <span>Email</span>
                      <input
                        name="email"
                        onChange={handleChange("email")}
                        type="email"
                        value={form.email}
                      />
                    </label>
                    <label className="form-field">
                      <span>Message</span>
                      <textarea
                        className="min-h-40"
                        name="message"
                        onChange={handleChange("message")}
                        value={form.message}
                      />
                    </label>
                  </div>

                  <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <button className="cta-button" disabled={status.type === "loading"} type="submit">
                      {status.type === "loading" ? "Sending..." : "Submit Inquiry"}
                    </button>
                    <p className="text-sm text-slate-500">
                      Prefer email? Write to <span className="font-semibold text-slate-950">{companyInfo.email}</span>
                    </p>
                  </div>

                  {status.type !== "idle" ? (
                    <div
                      className={`mt-5 rounded-[1.5rem] border px-4 py-3 text-sm leading-7 ${
                        status.type === "success"
                          ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-700"
                          : status.type === "error"
                            ? "border-red-500/20 bg-red-500/5 text-red-700"
                            : "border-slate-200 bg-slate-50 text-slate-600"
                      }`}
                    >
                      {status.message}
                    </div>
                  ) : null}
                </form>

                <div className="surface-card overflow-hidden p-2">
                  <iframe
                    className="h-[380px] w-full rounded-[1.5rem] border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={companyInfo.mapEmbed}
                    title="CAMPLAR office location"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

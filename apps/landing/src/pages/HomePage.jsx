import { useMemo, useRef, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  Typography,
} from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { motion as Motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import SiteFooter from "../components/site/SiteFooter";
import SiteHeader from "../components/site/SiteHeader";
import { calculateShippingEstimate } from "../utils/shippingCalculator";
import {
  businessSegments,
  courierPartners,
  faqs,
  features,
  heroContent,
  integrations,
  pricingRows,
  steps,
  testimonials,
  trustStats,
} from "../utils/siteContent";

const initialForm = {
  packageWeight: "",
  pickupPincode: "",
  deliveryPincode: "",
  packageLength: "",
  packageWidth: "",
  packageHeight: "",
};

const RUPEE = "\u20B9";

function formatWeight(value) {
  if (!value) {
    return "--";
  }

  return `${value.toFixed(2).replace(/\.00$/, "").replace(/(\.\d)0$/, "$1")} kg`;
}

function Reveal({ children, className = "", delay = 0 }) {
  const reduceMotion = useReducedMotion();

  return (
    <Motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      transition={reduceMotion ? undefined : { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.2 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
    >
      {children}
    </Motion.div>
  );
}

function SectionIntro({ label, title, description, align = "left", dark = false }) {
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <Chip
        label={label}
        sx={{
          backgroundColor: dark ? "rgba(255, 94, 20, 0.16)" : "rgba(255, 94, 20, 0.12)",
          borderRadius: "999px",
          color: dark ? "#ffd3c0" : "#d94b08",
          fontFamily: '"Montserrat", sans-serif',
          fontSize: "0.7rem",
          fontWeight: 700,
          letterSpacing: "0.24em",
          paddingInline: "0.35rem",
          textTransform: "uppercase",
        }}
      />
      <Typography className={`section-title mt-4 ${dark ? "!text-white" : ""}`} component="h2">
        {title}
      </Typography>
      {description ? (
        <Typography className={`section-copy mt-5 ${dark ? "!text-white/72" : ""}`} component="p">
          {description}
        </Typography>
      ) : null}
    </Reveal>
  );
}

function HomePage() {
  const [shippingForm, setShippingForm] = useState(initialForm);
  const heroRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const estimate = useMemo(() => calculateShippingEstimate(shippingForm), [shippingForm]);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.84]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.92, 0.22]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const heroImageY = useTransform(scrollYProgress, [0, 1], [0, -70]);

  const marketAverage = estimate.estimatedCost ? estimate.estimatedCost + 28 : 164;
  const camplarRate = estimate.estimatedCost || 136;
  const savings = marketAverage - camplarRate;

  const handleFieldChange = (key) => (event) => {
    setShippingForm((current) => ({
      ...current,
      [key]: event.target.value,
    }));
  };

  const scrollToCalculator = () => {
    document
      .getElementById("rate-calculator")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const heroMotionStyle = reduceMotion
    ? undefined
    : { scale: heroScale, opacity: heroOpacity, y: heroY, transformOrigin: "top center" };

  const heroImageStyle = reduceMotion ? undefined : { y: heroImageY };

  return (
    <div className="site-shell">
      <SiteHeader onPrimaryAction={scrollToCalculator} />

      <main>
        <section className="hero-gradient border-b border-[#d7edff]" id="hero" ref={heroRef}>
          <Motion.div
            className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-start lg:px-8 lg:py-24"
            style={heroMotionStyle}
          >
            <Reveal className="max-w-3xl" delay={0.05}>
              <Chip
                label={heroContent.eyebrow}
                sx={{
                  backgroundColor: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  borderRadius: "999px",
                  color: "#ffffff",
                  fontFamily: '"Montserrat", sans-serif',
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                }}
              />
              <Typography
                className="mt-6 font-heading text-5xl leading-[0.94] tracking-[0.02em] text-white sm:text-6xl lg:text-7xl"
                component="h1"
              >
                {heroContent.headline}
              </Typography>
              <Typography className="mt-6 max-w-2xl text-lg leading-8 text-white/82" component="p">
                {heroContent.subtext}
              </Typography>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button className="cta-button" onClick={scrollToCalculator} type="button">
                  {heroContent.primaryCta}
                </button>
                <Link className="outline-button outline-button--dark" to="/contact">
                  {heroContent.secondaryCta}
                </Link>
              </div>

              <div className="mt-12 grid items-stretch gap-4 sm:grid-cols-3">
                {heroContent.stats.map((item, index) => (
                  <Reveal key={item.label} className="h-full" delay={0.12 + index * 0.06}>
                    <div className="dark-card flex h-full flex-col p-5">
                      <Typography className="font-heading text-3xl tracking-[0.08em] text-white" component="p">
                        {item.value}
                      </Typography>
                      <Typography className="mt-2 text-sm leading-6 text-white/72" component="p">
                        {item.label}
                      </Typography>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>

            <Motion.div className="grid gap-5 lg:self-start" style={heroImageStyle}>
              <Reveal delay={0.08}>
                <div className="surface-card overflow-hidden p-2">
                  <div className="relative overflow-hidden rounded-[1rem] border border-black/5 bg-slate-950">
                    <img
                      alt="Camplar logistics operations"
                      className="h-[360px] w-full bg-slate-950 object-contain opacity-90 sm:h-[420px]"
                      loading="eager"
                      src={heroContent.image}
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#001d67] via-[#001d67]/70 to-transparent p-6 text-white">
                      <Typography className="text-xs font-semibold uppercase tracking-[0.26em] text-[#ffd7c3]" component="p">
                        Smart fulfilment visibility
                      </Typography>
                      <Typography className="mt-3 max-w-sm text-sm leading-7 text-white/82" component="p">
                        Compare partners, protect margins, and keep every shipment visible from pickup
                        through final delivery.
                      </Typography>
                    </div>
                  </div>
                </div>
              </Reveal>

            </Motion.div>
          </Motion.div>
        </section>

        <section className="section-frame" id="trust">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
            <SectionIntro
              align="center"
              description="Built for fast-moving teams that care about courier performance, shipping economics, and dependable delivery operations."
              label="Trust"
              title="Proof points that help teams ship with confidence"
            />

            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {trustStats.map((item, index) => (
                <Reveal key={item.label} delay={index * 0.05}>
                  <div className="surface-card p-6">
                    <Typography className="font-heading text-4xl tracking-[0.08em] text-slate-950" component="p">
                      {item.value}
                    </Typography>
                    <Typography className="mt-3 text-sm leading-7 text-slate-500" component="p">
                      {item.label}
                    </Typography>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-10">
              <div className="rounded-[1rem] border border-slate-200 bg-white p-6 shadow-[0_18px_48px_rgba(0,29,103,0.06)]">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <Chip
                      label="Business fit"
                      sx={{
                        backgroundColor: "rgba(255, 94, 20, 0.12)",
                        borderRadius: "999px",
                        color: "#d94b08",
                        fontFamily: '"Montserrat", sans-serif',
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                      }}
                    />
                    <Typography className="mt-3 font-heading text-3xl tracking-[0.05em] text-slate-950" component="h3">
                      Purpose-built for both B2B and B2C shipping teams
                    </Typography>
                  </div>
                  <Typography className="max-w-xl text-sm leading-7 text-slate-500" component="p">
                    Whether you manage wholesale dispatches or direct-to-customer fulfilment, CAMPLAR
                    adapts workflows to each shipping motion without operational complexity.
                  </Typography>
                </div>
                <div className="mt-8 grid gap-4 lg:grid-cols-2">
                  {businessSegments.map((item, index) => (
                    <Reveal key={item.badge} delay={0.08 + index * 0.06}>
                      <Motion.article
                        className={`rounded-[1rem] border border-slate-200 bg-gradient-to-br ${item.accent} p-6`}
                        initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
                        transition={reduceMotion ? undefined : { duration: 0.55, delay: 0.14 + index * 0.08 }}
                        viewport={{ once: true, amount: 0.3 }}
                        whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <Typography className="font-heading text-2xl tracking-[0.05em] text-slate-950" component="h4">
                            {item.title}
                          </Typography>
                          <Chip
                            label={item.badge}
                            sx={{
                              backgroundColor: "rgba(0, 29, 103, 0.08)",
                              borderRadius: "999px",
                              color: "#001d67",
                              fontFamily: '"Montserrat", sans-serif',
                              fontSize: "0.65rem",
                              fontWeight: 700,
                              letterSpacing: "0.18em",
                              textTransform: "uppercase",
                            }}
                          />
                        </div>
                        <Typography className="mt-4 text-sm leading-7 text-slate-600" component="p">
                          {item.description}
                        </Typography>
                        <ul className="mt-5 space-y-2">
                          {item.points.map((point, pointIndex) => (
                            <Motion.li
                              key={point}
                              className="flex items-center gap-3 text-sm text-slate-700"
                              initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                              transition={
                                reduceMotion
                                  ? undefined
                                  : { duration: 0.42, delay: 0.2 + index * 0.08 + pointIndex * 0.06 }
                              }
                              viewport={{ once: true, amount: 0.4 }}
                              whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                            >
                              <span className="h-2 w-2 rounded-full bg-[#ff5e14]" />
                              {point}
                            </Motion.li>
                          ))}
                        </ul>
                      </Motion.article>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section-frame section-frame--dark" id="how-it-works">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
            <SectionIntro
              dark
              description="A clear workflow from onboarding to dispatch so teams can move faster without juggling courier dashboards."
              label="How it Works"
              title="Register, add orders, select couriers, and ship without operational clutter"
            />

            <div className="mt-10 grid gap-5 lg:grid-cols-4">
              {steps.map((step, index) => (
                <Reveal key={step.title} delay={index * 0.06}>
                  <div className="dark-card p-6">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ff5e14]/15 font-heading text-2xl tracking-[0.12em] text-[#ffd3c0]">
                      {index + 1}
                    </span>
                    <Typography className="mt-5 font-heading text-3xl tracking-[0.05em] text-white" component="h3">
                      {step.title}
                    </Typography>
                    <Typography className="mt-4 text-sm leading-7 text-white/70" component="p">
                      {step.description}
                    </Typography>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section-frame" id="features">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
            <SectionIntro
              description="Courier aggregators work best when rate comparison, tracking, automation, and integrations live together in one streamlined system."
              label="Features"
              title="Everything needed to manage shipping operations from one unified platform"
            />

            <div className="mt-10 grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-5">
              {features.map((item, index) => (
                <Reveal key={item.title} className="h-full" delay={index * 0.05}>
                  <article className="surface-card flex h-full flex-col p-6">
                    <Chip
                      label={item.badge}
                      sx={{
                        alignSelf: "flex-start",
                        backgroundColor: "rgba(215, 237, 255, 0.85)",
                        borderRadius: "999px",
                        color: "#5b7d9a",
                        fontFamily: '"Montserrat", sans-serif',
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                      }}
                    />
                    <Typography className="mt-5 font-heading text-2xl tracking-[0.04em] text-slate-950" component="h3">
                      {item.title}
                    </Typography>
                    <Typography className="mt-4 text-sm leading-7 text-slate-500" component="p">
                      {item.description}
                    </Typography>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section-frame" id="rate-calculator">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
            <Reveal>
              <div className="surface-card p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <Chip
                      label="Rate calculator"
                      sx={{
                        backgroundColor: "rgba(255, 94, 20, 0.12)",
                        borderRadius: "999px",
                        color: "#d94b08",
                        fontFamily: '"Montserrat", sans-serif',
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                      }}
                    />
                    <Typography className="mt-3 font-heading text-3xl tracking-[0.05em] text-slate-950" component="h2">
                      Quote a lane in seconds
                    </Typography>
                    <Typography className="mt-3 max-w-xl text-sm leading-7 text-slate-500" component="p">
                      Add dead weight plus package dimensions to see actual, volumetric, and billable
                      weight before you book a shipment.
                    </Typography>
                  </div>
                  <Chip
                    label="5000 divisor"
                    sx={{
                      backgroundColor: "rgba(215, 237, 255, 0.85)",
                      borderRadius: "999px",
                      color: "#5b7d9a",
                      fontFamily: '"Montserrat", sans-serif',
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                    }}
                  />
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  <label className="form-field">
                    <span>Dead weight (kg)</span>
                    <input
                      onChange={handleFieldChange("packageWeight")}
                      placeholder="0.5"
                      step="0.01"
                      type="number"
                      value={shippingForm.packageWeight}
                    />
                  </label>
                  <label className="form-field">
                    <span>Pickup pincode</span>
                    <input
                      inputMode="numeric"
                      maxLength={6}
                      onChange={handleFieldChange("pickupPincode")}
                      placeholder="380058"
                      value={shippingForm.pickupPincode}
                    />
                  </label>
                  <label className="form-field">
                    <span>Delivery pincode</span>
                    <input
                      inputMode="numeric"
                      maxLength={6}
                      onChange={handleFieldChange("deliveryPincode")}
                      placeholder="400001"
                      value={shippingForm.deliveryPincode}
                    />
                  </label>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  <label className="form-field">
                    <span>Length (cm)</span>
                    <input
                      min="1"
                      onChange={handleFieldChange("packageLength")}
                      placeholder="30"
                      step="0.1"
                      type="number"
                      value={shippingForm.packageLength}
                    />
                  </label>
                  <label className="form-field">
                    <span>Width (cm)</span>
                    <input
                      min="1"
                      onChange={handleFieldChange("packageWidth")}
                      placeholder="24"
                      step="0.1"
                      type="number"
                      value={shippingForm.packageWidth}
                    />
                  </label>
                  <label className="form-field">
                    <span>Height (cm)</span>
                    <input
                      min="1"
                      onChange={handleFieldChange("packageHeight")}
                      placeholder="18"
                      step="0.1"
                      type="number"
                      value={shippingForm.packageHeight}
                    />
                  </label>
                </div>

                <Typography className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500" component="p">
                  Volumetric weight = (length x width x height) / 5000
                </Typography>

                <div className="mt-6 grid gap-4 md:grid-cols-4">
                  <div className="result-card">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                      Dead weight
                    </p>
                    <p className="mt-3 font-heading text-3xl tracking-[0.08em] text-slate-950">
                      {formatWeight(estimate.actualWeight)}
                    </p>
                  </div>
                  <div className="result-card">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                      Volumetric
                    </p>
                    <p className="mt-3 font-heading text-3xl tracking-[0.08em] text-slate-950">
                      {formatWeight(estimate.volumetricWeight)}
                    </p>
                  </div>
                  <div className="result-card">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                      Billable
                    </p>
                    <p className="mt-3 font-heading text-3xl tracking-[0.08em] text-slate-950">
                      {formatWeight(estimate.billableWeight)}
                    </p>
                  </div>
                  <div className="result-card">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                      Estimated cost
                    </p>
                    <p className="mt-3 font-heading text-4xl tracking-[0.08em] text-slate-950">
                      {estimate.estimatedCost ? `${RUPEE}${estimate.estimatedCost}` : "--"}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div className="result-card">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                      Shipping zone
                    </p>
                    <p className="mt-3 font-heading text-4xl tracking-[0.08em] text-slate-950">
                      {estimate.zoneLabel}
                    </p>
                  </div>
                  <div className="result-card">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                      Expected ETA
                    </p>
                    <p className="mt-3 font-heading text-4xl tracking-[0.08em] text-slate-950">
                      {estimate.eta}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section-frame" id="partners">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
            <SectionIntro
              description="Build a delivery mix around serviceability, delivery promise, and cost performance without splitting your workflow across tools."
              label="Courier Partners"
              title="Multiple courier options, one dependable control layer"
            />

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {courierPartners.map((partner, index) => (
                <Reveal key={partner.name} delay={index * 0.04}>
                  <div className="surface-card p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Typography className="font-heading text-3xl tracking-[0.08em] text-slate-950" component="h3">
                          {partner.name}
                        </Typography>
                        <Typography className="mt-2 text-sm text-slate-500" component="p">
                          {partner.coverage}
                        </Typography>
                      </div>
                      <span className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] ${partner.accent}`}>
                        Partner
                      </span>
                    </div>
                    <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-[#001d67] via-[#ff5e14] to-[#ffd3c0]" />
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section-frame" id="pricing">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-24">
            <div>
              <SectionIntro
                description="Let courier comparison and operational visibility protect your margins. The same quote utility above feeds the pricing view below."
                label="Pricing Advantage"
                title="Know where CAMPLAR helps you save on every lane"
              />
              <Reveal className="mt-8">
                <div className="surface-card p-6">
                  <Typography className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500" component="p">
                    Live calculator tie-in
                  </Typography>
                  <div className="mt-5 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-[1rem] bg-slate-50 p-4">
                      <Typography className="text-xs uppercase tracking-[0.2em] text-slate-500" component="p">
                        Quoted rate
                      </Typography>
                      <Typography className="mt-2 font-heading text-3xl tracking-[0.08em] text-slate-950" component="p">
                        {RUPEE}
                        {camplarRate}
                      </Typography>
                    </div>
                    <div className="rounded-[1rem] bg-slate-50 p-4">
                      <Typography className="text-xs uppercase tracking-[0.2em] text-slate-500" component="p">
                        Market average
                      </Typography>
                      <Typography className="mt-2 font-heading text-3xl tracking-[0.08em] text-slate-950" component="p">
                        {RUPEE}
                        {marketAverage}
                      </Typography>
                    </div>
                    <div className="rounded-[1rem] bg-[#001d67] p-4 text-white">
                      <Typography className="text-xs uppercase tracking-[0.2em] text-white/68" component="p">
                        Potential savings
                      </Typography>
                      <Typography className="mt-2 font-heading text-3xl tracking-[0.08em] text-white" component="p">
                        {RUPEE}
                        {savings > 0 ? savings : 0}
                      </Typography>
                    </div>
                  </div>
                  <button className="mt-6 outline-button" onClick={scrollToCalculator} type="button">
                    Recalculate rate
                  </button>
                </div>
              </Reveal>
            </div>

            <Reveal className="surface-card overflow-hidden p-0" delay={0.06}>
              <div className="border-b border-slate-200 bg-[#001d67] px-6 py-5 text-white">
                <Typography className="text-xs font-semibold uppercase tracking-[0.24em] text-[#ffd3c0]" component="p">
                  Savings comparison
                </Typography>
                <Typography className="mt-3 font-heading text-3xl tracking-[0.06em]" component="h3">
                  Compare traditional booking to smart aggregation
                </Typography>
              </div>
              <div className="overflow-x-auto p-6">
                <table className="w-full min-w-[34rem] text-left">
                  <thead>
                    <tr className="text-xs uppercase tracking-[0.22em] text-slate-500">
                      <th className="pb-4">Lane</th>
                      <th className="pb-4">Traditional</th>
                      <th className="pb-4">CAMPLAR</th>
                      <th className="pb-4">Advantage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pricingRows.map((row) => (
                      <tr key={row.lane} className="border-t border-slate-200 text-sm text-slate-600">
                        <td className="py-5 font-semibold text-slate-950">{row.lane}</td>
                        <td className="py-5">{RUPEE}{row.legacyRate}</td>
                        <td className="py-5 font-semibold text-[#ff5e14]">{RUPEE}{row.camplarRate}</td>
                        <td className="py-5">
                          <span className="rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                            {row.savings}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section-frame" id="integrations">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
            <SectionIntro
              description="Connect order sources and keep fulfilment updates moving back into the systems your team already uses."
              label="Integrations"
              title="Commerce integrations that keep order intake and shipping execution aligned"
            />

            <div className="mt-10 grid items-stretch gap-5 lg:grid-cols-3">
              {integrations.map((item, index) => (
                <Reveal key={item.name} className="h-full" delay={index * 0.05}>
                  <div className="surface-card flex h-full flex-col p-6">
                    <div className="flex items-center gap-4">
                      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#001d67] font-heading text-2xl tracking-[0.1em] text-white">
                        {item.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Typography className="font-heading text-3xl tracking-[0.06em] text-slate-950" component="h3">
                          {item.name}
                        </Typography>
                        {item.comingSoon ? (
                          <Chip
                            label="Coming Soon"
                            size="small"
                            sx={{
                              backgroundColor: "rgba(255, 94, 20, 0.12)",
                              borderRadius: "999px",
                              color: "#d94b08",
                              fontFamily: '"Montserrat", sans-serif',
                              fontSize: "0.6rem",
                              fontWeight: 700,
                              letterSpacing: "0.12em",
                              textTransform: "uppercase",
                            }}
                          />
                        ) : null}
                      </div>
                    </div>
                    <Typography className="mt-5 text-sm leading-7 text-slate-500" component="p">
                      {item.description}
                    </Typography>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section-frame" id="testimonials">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
            <SectionIntro
              align="center"
              description="Reviews that reflect the operational value of shipping visibility, better courier choice, and dependable support."
              label="Testimonials"
              title="What teams say after shipping through CAMPLAR"
            />

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {testimonials.map((item, index) => (
                <Reveal key={item.name} delay={index * 0.05}>
                  <blockquote className="surface-card flex h-full flex-col p-6">
                    <Typography className="text-base leading-8 text-slate-600" component="p">
                      &ldquo;{item.quote}&rdquo;
                    </Typography>
                    <div className="mt-8 flex items-center gap-4">
                      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#ff5e14]/10 font-heading text-lg tracking-[0.1em] text-[#ff5e14]">
                        {item.name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")}
                      </div>
                      <div>
                        <Typography className="font-semibold text-slate-950" component="p">
                          {item.name}
                        </Typography>
                        <Typography className="text-sm text-slate-500" component="p">
                          {item.role}
                        </Typography>
                      </div>
                    </div>
                  </blockquote>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section-frame" id="faq">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
            <SectionIntro
              description="Common questions around courier aggregation, quoting, integrations, and platform readiness."
              label="FAQ"
              title="Answers for teams exploring CAMPLAR"
            />

            <div className="mt-10 grid gap-4">
              {faqs.map((item, index) => (
                <Reveal key={item.question} delay={index * 0.03}>
                  <Accordion
                    disableGutters
                    elevation={0}
                    sx={{
                      backgroundColor: "rgba(255,255,255,0.94)",
                      border: "1px solid rgba(215, 237, 255, 0.95)",
                      borderRadius: "1rem !important",
                      boxShadow: "0 14px 40px rgba(0, 29, 103, 0.06)",
                      "&:before": { display: "none" },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreRoundedIcon sx={{ color: "#ff5e14" }} />}
                      sx={{
                        minHeight: "unset",
                        px: 3,
                        py: 1.5,
                        "& .MuiAccordionSummary-content": {
                          margin: "0",
                        },
                      }}
                    >
                      <Typography className="font-heading text-2xl tracking-[0.04em] text-slate-950" component="h3">
                        {item.question}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ px: 3, pb: 3, pt: 0 }}>
                      <Typography className="max-w-4xl text-sm leading-8 text-slate-500" component="p">
                        {item.answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section-frame pb-0">
          <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
            <Reveal>
              <div className="cta-panel">
                <div>
                  <Chip
                    label="Start shipping"
                    sx={{
                      backgroundColor: "rgba(255, 94, 20, 0.16)",
                      borderRadius: "999px",
                      color: "#ffd3c0",
                      fontFamily: '"Montserrat", sans-serif',
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                    }}
                  />
                  <Typography className="mt-4 font-heading text-4xl tracking-[0.05em] text-white sm:text-5xl" component="h2">
                    Ready to simplify courier operations and protect your shipping margins?
                  </Typography>
                  <Typography className="mt-5 max-w-2xl text-base leading-8 text-white/78" component="p">
                    Explore the quote calculator or book a demo to shape your courier workflow around
                    better rates, cleaner visibility, and fewer operational bottlenecks.
                  </Typography>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button className="cta-button cta-button--light" onClick={scrollToCalculator} type="button">
                    Start Shipping
                  </button>
                  <Link className="outline-button outline-button--dark" to="/contact">
                    Book Demo
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

export default HomePage;
